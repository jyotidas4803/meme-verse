function fetchMemes() {
    fetch('https://meme-api.com/gimme/30') // Fetch 30 memes
        .then(response => response.json())
        .then(data => {
            const memeContainer = document.getElementById('meme-container');
            memeContainer.innerHTML = ''; // Clear previous memes

            data.memes.forEach(meme => {
                const memeCard = `
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="${meme.url}" alt="Meme" class="w-full h-64 object-cover">
                        <div class="p-4">
                            <h2 class="text-lg font-semibold">${meme.title}</h2>
                            <p class="text-sm text-gray-500">👍 ${meme.ups} upvotes</p>
                            <a href="${meme.postLink}" target="_blank" class="text-blue-500 text-sm mt-2 inline-block">View on Reddit</a>
                        </div>
                    </div>
                `;
                memeContainer.innerHTML += memeCard;
            });
        })
        .catch(error => console.error('Error fetching memes:', error));
}

// Fetch memes on page load
fetchMemes();