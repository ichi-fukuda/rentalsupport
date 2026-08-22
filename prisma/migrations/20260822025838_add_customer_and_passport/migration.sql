/*
  Warnings:

  - Added the required column `customerId` to the `RentalSession` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hostId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Customer_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RentalSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hostId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'STARTED',
    "lang" TEXT NOT NULL DEFAULT 'ja',
    "passportPhotoPath" TEXT,
    "licensePhotoPath" TEXT,
    "damagePhotoPaths" TEXT NOT NULL DEFAULT '',
    "returnPhotoPaths" TEXT NOT NULL DEFAULT '',
    "fuelConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    CONSTRAINT "RentalSession_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RentalSession_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RentalSession_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RentalSession" ("completedAt", "createdAt", "damagePhotoPaths", "fuelConfirmed", "hostId", "id", "lang", "licensePhotoPath", "returnPhotoPaths", "status", "vehicleId") SELECT "completedAt", "createdAt", "damagePhotoPaths", "fuelConfirmed", "hostId", "id", "lang", "licensePhotoPath", "returnPhotoPaths", "status", "vehicleId" FROM "RentalSession";
DROP TABLE "RentalSession";
ALTER TABLE "new_RentalSession" RENAME TO "RentalSession";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_hostId_email_key" ON "Customer"("hostId", "email");
