const API_KEY = "AIzaSyAl-DO4bZ_jlQEGOAFQZnFypYNvMGSndYc";

export default class YoutubeAPIHelper {

    static executeSearchByKeyword = (keyword, settings) => {
        let safeSearchValue = settings.safeSearch ? "moderate" : "none";
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${settings.maxResults}&type=video&order=${settings.order.label}&safeSearch=${safeSearchValue}&q=${keyword}&key=${API_KEY}`;
        url = encodeURI(url);
        console.log("fetch URL: ", url);
        return fetch(url)
            .then(response => response.json())
    };

    // static fetchVideosByVideoIds = (idList) => {
    //
    // }
}