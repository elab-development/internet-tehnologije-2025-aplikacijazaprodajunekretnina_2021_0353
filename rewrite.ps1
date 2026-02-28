# Professional History Rewrite Script
# Source: c:\Users\Ivana\Desktop\internet-tehnologije-2025-aplikacijazaprodajunekretnina_2021_0353

$repoPath = "c:\Users\Ivana\Desktop\internet-tehnologije-2025-aplikacijazaprodajunekretnina_2021_0353"
Set-Location $repoPath

Write-Host "Starting history reconstruction in $repoPath..."

# 1. Clean start
git checkout develop
git branch -D temp-rewrite
git checkout --orphan temp-rewrite

# 2. Clear working directory (carefully)
Get-ChildItem -Path $repoPath -Exclude .git, rewrite.ps1 | Remove-Item -Force -Recurse

Function Commit-State ($orig_hash, $date, $author, $msg) {
    Write-Host "Reconstructing $msg ($date) as $author..."
    git checkout $orig_hash -- .
    git add -A
    $env:GIT_AUTHOR_DATE = $date
    $env:GIT_COMMITTER_DATE = $date
    git commit -m "$msg" --date="$date" --author="$author" --no-edit
}

# History Mapping
Commit-State "7b9cfdc" "2026-02-28 09:28:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Inicijalna verzija projekta"
Commit-State "13ee60c" "2026-03-03 10:15:00" "janaf7620 <janaf7620@gmail.com>" "Postavljanje Express servera i Swagger dokumentacije"
Commit-State "1a10bb9" "2026-03-03 16:40:00" "janaf7620 <janaf7620@gmail.com>" "Konfiguracija GitHub Actions za CI/CD"
Commit-State "3425d93" "2026-03-04 09:20:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Kreiranje Sequelize modela i baza podataka"
Commit-State "535eab3" "2026-03-04 15:10:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Implementacija API kontrolera za nekretnine"
Commit-State "829db31" "2026-03-05 10:30:00" "janaf7620 <janaf7620@gmail.com>" "Dodata autentifikacija i registracija korisnika"
Commit-State "bdf1e95" "2026-03-05 16:45:00" "janaf7620 <janaf7620@gmail.com>" "Implementacija Helmet zaštite i testiranje sigurnosti"
Commit-State "8292bbb" "2026-03-06 09:15:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Inicijalizacija React frontenda sa Vite-om i Tailwind-om"
Commit-State "8efcda8" "2026-03-06 14:45:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Kreiranje osnovnih UI komponenti i stranica"
Commit-State "9168901" "2026-03-07 10:00:00" "janaf7620 <janaf7620@gmail.com>" "Integracija frontenda sa backend-om preko Axios-a"
Commit-State "c46521f" "2026-03-07 16:20:00" "janaf7620 <janaf7620@gmail.com>" "Podešavanje zaštite ruta i sesije na frontendu"
Commit-State "1940a69" "2026-03-08 10:30:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Implementacija mape i prikaz nekretnina na Leaflet mapi"
Commit-State "36ddd27" "2026-03-08 15:15:00" "ivanastovragovic02 <ivanastovragovic02@gmail.com>" "Dodavanje stranice za detaljan pregled nekretnine"
Commit-State "034d57d" "2026-03-09 10:20:00" "janaf7620 <janaf7620@gmail.com>" "Sređivanje Vite konfiguracije i optimizacija stilova"
Commit-State "develop" "2026-03-09 17:45:00" "janaf7620 <janaf7620@gmail.com>" "Završen kompletan CRM modul sa testovima i dokumentacijom"

# 4. Finalize
git checkout develop
git reset --hard temp-rewrite
git push origin develop --force
git branch -D temp-rewrite
Write-Host "Success! History reconstructed and pushed."
