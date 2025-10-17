# Script de Déploiement Rapide
# Usage : .\deploy.ps1 "Votre message de commit"

param(
    [string]$message = "Update content"
)

Write-Host "🚀 Déploiement en cours..." -ForegroundColor Cyan
Write-Host ""

# Vérifier l'état
Write-Host "📝 Fichiers modifiés :" -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "📦 Ajout des fichiers..." -ForegroundColor Yellow
git add .

Write-Host "💾 Commit : $message" -ForegroundColor Yellow
git commit -m $message

Write-Host "☁️  Push vers GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ Code envoyé sur GitHub !" -ForegroundColor Green
Write-Host "⏳ Vercel va déployer automatiquement (1-3 minutes)" -ForegroundColor Cyan
Write-Host ""
Write-Host "📧 Vous recevrez un email quand c'est prêt" -ForegroundColor Cyan
Write-Host "🌐 Site : https://votredomaine.com" -ForegroundColor Green
Write-Host ""

