migration.up = function(migrator) {
    migrator.createTable({
        "columns":
        {
            "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
            "title": "TEXT",
            "content": "TEXT",
            "published": "BOOLEAN"
        }
    });
};

migration.down = function(migrator) {
    migrator.dropTable();
};
