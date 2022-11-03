const gordonNowChatEnv = () => {

  const envVars = {
    healthCheck: true,
    chatChannel: 'www-us-prd',
    environment: 'prd',
    defaultDesktopActiveState: 0,
  }

  // Grab all the data attributes set on this script by the parent site, and add them to the chatbot loader script.
  const thisScript = document.getElementById('gordon-now-chat-env');
  if (!thisScript) {
    console.error('Gordon Now Error: The gordon-now-chat-env.js script could not find itself on the page by searching for the ID: gordon-now-chat-env');
    return;
  }

  const chatbotLoaderScript = document.createElement('script');
  chatbotLoaderScript.id = 'gordon-now-chat-loader';

  const thisScriptUrl = new URL(thisScript.src);

  // Build the chatbot loader script's pathname depending on some other variables:
  let loaderScriptPath = `/3/gordon-now-chat-loader.js`;

  // Check if the gordon-now-chat-env.js script has a tag in the path, and if so capture it into a regex group.
  const pathRegexMatch = thisScriptUrl.pathname.match(/^\/config\/tags\/([0-9.]+)\/[\w-]+\/gordon-now-chat-env.js$/);
  // Use the tag from the gordon-now-chat-env.js script path--if it exists--when building the loader script URL.
  if (pathRegexMatch && pathRegexMatch[1] !== undefined) {
    const tag = pathRegexMatch[1];
    // Pass the tag into the loader script
    chatbotLoaderScript.dataset.tag = tag;
    loaderScriptPath = `/tags/${tag}/gordon-now-chat-loader.js`;
  }

  // NOTE: The loader script will use parts of its own URL (aka the following line) to dynamically build the URL of the
  // chatbot iframe, depending on whether it has the major version or specific tag version path (which is defined above).
  chatbotLoaderScript.src = new URL(thisScriptUrl.origin + loaderScriptPath);

  for (const dataAttribute in thisScript.dataset) {
    chatbotLoaderScript.dataset[dataAttribute] = thisScript.dataset[dataAttribute];
  }
  chatbotLoaderScript.dataset.scriptEnvVars = JSON.stringify(envVars);

  document.head.appendChild(chatbotLoaderScript);
};

// If module.exports is defined, that means we're in a unit-testing context.
if (typeof module !== 'undefined' && module?.exports) {
  module.exports = gordonNowChatEnv;
} else {
  gordonNowChatEnv();
}
