migrate((db) => {
  const collection = new Collection({
    "id": "80jap6xkp3b0aps",
    "created": "2023-03-19 02:24:30.200Z",
    "updated": "2023-03-19 02:24:30.200Z",
    "name": "schedules",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "coprlhfs",
        "name": "schdule",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "2jncxrol",
        "name": "type",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": "^(soccer|rugby)$"
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("80jap6xkp3b0aps");

  return dao.deleteCollection(collection);
})
