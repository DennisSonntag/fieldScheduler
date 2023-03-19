migrate((db) => {
  const collection = new Collection({
    "id": "aep6rrexhwg7s8g",
    "created": "2023-03-19 02:24:30.199Z",
    "updated": "2023-03-19 02:24:30.199Z",
    "name": "schools",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4xzouzhw",
        "name": "school_name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tnmco1vc",
        "name": "school_code",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "cu414man",
        "name": "has_field",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("aep6rrexhwg7s8g");

  return dao.deleteCollection(collection);
})
