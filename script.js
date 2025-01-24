async function shortenUrl() {
    const inputUrl = document.getElementById("longUrl").value.trim();
    const resultElement = document.getElementById("shortUrlResult");

    try {
        const response = await fetch('urls.json');
        const urlMappings = await response.json();
        console.log(urlMappings);
        
        const mapping = urlMappings.find(entry => entry.longUrl == inputUrl);
        console.log(mapping);
        
        if (mapping) {
            resultElement.innerHTML = `Short URL: <a href="${mapping.shortUrl}" id="shortUrl" target="_blank">${mapping.shortUrl}</a>`;
        } else {
            resultElement.innerHTML = "Short URL not found for the given input.";
        }
    } catch (error) {
        resultElement.innerHTML = "Error loading URL data.";
        console.error("Error fetching JSON:", error);
    }
}

function copyLink() {
    const link = document.getElementById("shortUrl");
    if (!link) {
      alert("No link to copy!");
      return;
    }
    navigator.clipboard.writeText(link)
      .then(() => {
        alert(`${link} copied to clipboard!`);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  }
