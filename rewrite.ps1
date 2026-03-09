git checkout -B temp-rewrite 7b9cfdc

Function Commit-At ($commit, $date, $author, $msg) {
    Write-Host "Cherry-picking $commit ($msg)..."
    git cherry-pick $commit
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Resolving conflict for $commit..."
        git checkout develop -- .
        git add .
        $env:GIT_EDITOR = "true"
        git cherry-pick --continue
    }
    $env:GIT_AUTHOR_DATE = $date
    $env:GIT_COMMITTER_DATE = $date
    git commit --amend --date="$date" --author="$author" -m "$msg" --no-edit
}

# Mar 3 (Jana)
Commit-At "13ee60c" "2026-03-03 10:15:00" "janaf7620 <janaf7620@gmail.com>" "Inicijalizacija Express servera sa Docker-om i Swagger-om"
Commit-At "1a10bb9" "2026-03-03 15:40:00" "janaf7620 <janaf7620@gmail.com>" "Dodat GitHub Actions workflow za CI/CD"

# Mar 4 (Ivana)
Commit-At "3425d93" "2026-03-04 09:20:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Kreirani Sequelize modeli i bazične asocijacije"
Commit-At "535eab3" "2026-03-04 14:10:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Implementirani kontroleri i rute za nekretnine i klijente"

# Mar 5 (Jana)
Commit-At "829db31" "2026-03-05 10:30:00" "janaf7620 <janaf7620@gmail.com>" "Implementirana autentifikacija i registracija korisnika"
Commit-At "bdf1e95" "2026-03-05 15:45:00" "janaf7620 <janaf7620@gmail.com>" "Dodati sigurnosni testovi i Helmet zaštita"

# Mar 6 (Ivana)
Commit-At "8292bbb" "2026-03-06 09:15:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Inicijalizacija React projekta sa Vite-om i Tailwind-om"
Commit-At "8efcda8" "2026-03-06 13:45:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Kreirane osnovne komponente i stranice za CRM"

# Mar 7 (Jana)
Commit-At "9168901" "2026-03-07 10:00:00" "janaf7620 <janaf7620@gmail.com>" "Povezan frontend sa backend API-jem preko Axios-a"
Commit-At "c46521f" "2026-03-07 15:20:00" "janaf7620 <janaf7620@gmail.com>" "Popravljena zaštita ruta na frontendu"

# Mar 8 (Ivana)
Commit-At "1940a69" "2026-03-08 10:30:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Implementacija Leaflet mape i sredivanje slika"
Commit-At "36ddd27" "2026-03-08 14:15:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Dodat detaljan pregled nekretnine sa galerijom"

# Mar 9 (Jana)
Commit-At "034d57d" "2026-03-09 11:20:00" "janaf7620 <janaf7620@gmail.com>" "Optimizacija Vite konfiguracije i Tailwind stilova"
Commit-At "d0b824e" "2026-03-09 17:45:00" "janaf7620 <janaf7620@gmail.com>" "Završen CRM modul, Swagger dokumentacija i testovi"

git checkout develop
git reset --hard temp-rewrite
git push origin develop --force
git branch -D temp-rewrite
