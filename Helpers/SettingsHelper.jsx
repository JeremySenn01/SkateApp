export default class SettingsHelper {

    static getDefaultSettings = () => {
        return {
            order: {key: 1, label: "relevance"},
            safeSearch: false,
            maxResults: 5
        };
    };

    static getOrderOptions = () => {
        return [
            {key: 1, label: "relevance"},
            {key: 2, label: "date"},
            {key: 3, label: "rating"},
            {key: 4, label: "title"},
            {key: 5, label: "viewCount"}
        ];
    }
}