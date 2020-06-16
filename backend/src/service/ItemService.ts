import Item from "../models/Item";

export default class ItemService {
    getChats = () =>
        new Promise((resolve) =>
            Item.findAll().then((response) => {
                response.map((item) => {
                    {
                        item.title,
                            item.id,
                            (item.image = `http://192.168.100.127:3300/uploads/${item.image}`);
                    }
                });
                return resolve(response);
            })
        );
}
