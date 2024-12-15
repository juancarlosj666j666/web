<?php
function connectToDatabase() {
    $db = new SQLite3('database.db');
    return $db;
}
?>
