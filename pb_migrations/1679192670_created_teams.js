migrate((db) => {
  const collection = new Collection({
    "id": "9qjqdl38jskc72x",
    "created": "2023-03-19 02:24:30.200Z",
    "updated": "2023-03-19 02:24:30.200Z",
    "name": "teams",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ukzvins9",
        "name": "school",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "aep6rrexhwg7s8g",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "srbbkrxp",
        "name": "team_type",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "xfx9p9rv",
        "name": "div",
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
  const collection = dao.findCollectionByNameOrId("9qjqdl38jskc72x");

  return dao.deleteCollection(collection);
})
