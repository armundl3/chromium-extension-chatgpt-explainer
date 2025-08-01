/*
 * ChatGPT Explainer Chrome Extension
 *
 * This service worker registers a context menu item that allows users to
 * send selected text from any webpage to ChatGPT for explanation. When
 * invoked, the extension collects the highlighted text and the source
 * page URL, truncates the selection to ensure the total length of the
 * quoted text does not exceed 2048 characters (including the opening and
 * closing quotation marks), and appends an ellipsis if truncation
 * occurred. It then constructs a ChatGPT prompt with both elements
 * URL‑encoded and opens a new tab to ChatGPT with the prompt as a
 * query parameter.
 */

// Set up the context menu when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "explain-with-chatgpt",
    title: "Explain this with ChatGPT",
    contexts: ["selection"]
  });
});

// Respond to clicks on the context menu item.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "explain-with-chatgpt") {
    return;
  }

  // Extract the selected text. The context menu API only provides the first
  // selection range as `selectionText`—multi-selection is not supported
  // via this API, but we ensure we work with whatever string is provided.
  let selectedText = info.selectionText || "";

  // Define the maximum number of characters allowed for the quoted
  // selection. Since we wrap the text in a pair of double quotes in the
  // ChatGPT prompt, we subtract two characters to account for the
  // quotation marks themselves.
  const maxTotalLength = 2048;
  const quoteOverhead = 2;
  const maxTextLength = maxTotalLength - quoteOverhead;

  let truncatedText = selectedText;
  // If the selection exceeds the allowed length, truncate it and append an
  // ellipsis (U+2026). We reserve one character for the ellipsis so the
  // final length including quotes and the ellipsis does not exceed 2048.
  if (selectedText.length > maxTextLength) {
    const ellipsis = "…";
    truncatedText = selectedText.substring(0, maxTextLength - 1) + ellipsis;
  }

  // Encode the truncated selection and page URL. The spec requires only
  // these pieces to be URL‑encoded; the rest of the prompt string is
  // written with explicit escape sequences (e.g., %20 for spaces,
  // %0A for newlines). Quotes around the encoded selection are kept
  // unescaped to mirror the example provided.
  const encodedSelected = encodeURIComponent(truncatedText);
  const pageUrl = info.pageUrl || (tab && tab.url) || "";
  const encodedSource = encodeURIComponent(pageUrl);

  // Build the final URL to open. The prompt format matches the
  // specification exactly: it instructs ChatGPT to explain the text,
  // includes the quoted selection, and cites the source URL. Newlines
  // (%0A) separate sections for readability inside ChatGPT.
  const chatUrl =
    `https://chat.openai.com/?prompt=Explain%20the%20following%20text:%0A%0A"${encodedSelected}"%0A%0ASource:%20${encodedSource}`;

  // Open the constructed URL in a new tab. The tab will become the
  // active tab so the user immediately sees the ChatGPT conversation.
  chrome.tabs.create({
    url: chatUrl,
    active: true
  });
});