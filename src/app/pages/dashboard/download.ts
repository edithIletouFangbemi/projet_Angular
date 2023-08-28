  import * as fs from 'node:fs';
  import { join } from 'path';

// ✅ write to file SYNCHRONOUSLY
function syncWriteFile(filename: string, data: any) {
  const repertoire = "/";
  const file = join(repertoire, filename);
  console.log("En cours" + file);
  fs.openSync(file,'w');
  fs.writeFile(file, data, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Fichier écrit avec succès');
   });
}

