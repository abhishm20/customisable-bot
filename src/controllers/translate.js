export const Service = {
    translate: async function (text, fromLang, toLang) {
        const response = await fetch(`https://microsoft-azure-translation-v1.p.rapidapi.com/translate?from=${fromLang}&to=${toLang}&text=${encodeURIComponent(text)}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "microsoft-azure-translation-v1.p.rapidapi.com",
                "x-rapidapi-key": "e8643dc951msheede2a74546c7bbp1f387ejsnbcf362e2be4d",
                "accept": "application/json"
            }
        });

        let res = await response.text();
        const oParser = new DOMParser();
        const oDOM = oParser.parseFromString(res, "application/xml");
        return decodeURIComponent(oDOM.documentElement.textContent);
    }
};
