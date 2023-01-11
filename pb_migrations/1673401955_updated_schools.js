migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3fgejozmot97c3v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lrgatcfc",
    "name": "has_field",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3fgejozmot97c3v")

  // remove
  collection.schema.removeField("lrgatcfc")

  return dao.saveCollection(collection)
})
