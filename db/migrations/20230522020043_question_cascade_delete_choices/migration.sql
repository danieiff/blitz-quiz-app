-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "text" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "Choice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Choice" ("createdAt", "id", "questionId", "text", "updatedAt", "votes") SELECT "createdAt", "id", "questionId", "text", "updatedAt", "votes" FROM "Choice";
DROP TABLE "Choice";
ALTER TABLE "new_Choice" RENAME TO "Choice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
