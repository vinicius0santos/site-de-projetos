import { apiUrl, headers } from "../global.js";

class Section {
    static async create(title, projectId) {
        const url = apiUrl + '/section/create';

        let section;
        try{
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({title: title, projectId: projectId}),
                headers: headers
            });

            section = (await response.json()).data;
        }
        catch(err){
            section = [];
        }

        return section || [];
    }

}

export default Section;
