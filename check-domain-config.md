# 🔍 Diagnostic de Configuration Domaine

## Étape 1 : Identifier les Nameservers Actuels

Ouvrez PowerShell et exécutez :

```powershell
# Remplacez votredomaine.com par votre vrai domaine
nslookup -type=NS votredomaine.com
```

**Résultats possibles :**

### Si vous voyez des nameservers Cloudflare :
```
votredomaine.com nameserver = alice.ns.cloudflare.com
votredomaine.com nameserver = bob.ns.cloudflare.com
```
✅ **Configuration actuelle** : Cloudflare gère le DNS

### Si vous voyez des nameservers Hostinger :
```
votredomaine.com nameserver = ns1.dns-parking.com
votredomaine.com nameserver = ns2.dns-parking.com
```
✅ **Configuration actuelle** : Hostinger gère le DNS

---

## Étape 2 : Vérifier l'IP du Site

```powershell
nslookup votredomaine.com
```

**Analysez le résultat :**

### Si l'IP commence par :
- `76.76.x.x` ou `76.223.x.x` → **Vercel**
- `104.x.x.x` ou `172.x.x.x` → **Cloudflare Proxy** (nuage orange)
- Autre → Vérifiez où pointe votre site

---

## Étape 3 : Vérifier le SSL/HTTPS

Ouvrez votre navigateur et testez :

1. `http://votredomaine.com` → Doit rediriger vers HTTPS
2. `https://votredomaine.com` → Doit afficher un cadenas vert
3. `https://www.votredomaine.com` → Doit fonctionner aussi

---

## 📊 Configuration Standard (Hostinger + Cloudflare + Vercel)

Voici comment ils travaillent ensemble :

```
┌─────────────┐
│  Hostinger  │ ← Vous achetez le domaine ici
│  (Registrar)│    Il garde juste le domaine enregistré
└──────┬──────┘
       │
       │ Nameservers pointent vers ↓
       │
┌──────▼──────────┐
│   Cloudflare    │ ← Gère le DNS + CDN + Sécurité
│   (DNS + CDN)   │    - Cache votre site
└──────┬──────────┘    - SSL automatique
       │                - Protection DDoS
       │                - Analytics
       │
       │ DNS pointe vers ↓
       │
┌──────▼──────┐
│   Vercel    │ ← Héberge votre site Next.js
│  (Hosting)  │    - Build automatique
└─────────────┘    - Déploiement rapide
```

---

## 🎯 Rôle de Chaque Service

### 1️⃣ Hostinger
**Rôle** : Registrar (propriétaire du domaine)
- Vous payez l'abonnement annuel du domaine ici
- Configure les nameservers pour pointer vers Cloudflare
- **N'héberge PAS votre site** (juste le domaine)

### 2️⃣ Cloudflare  
**Rôle** : DNS + CDN + Sécurité
- Gère les enregistrements DNS (A, CNAME, etc.)
- Cache votre site sur ses serveurs mondiaux
- Protège contre les attaques
- Optimise la vitesse
- SSL automatique
- **Gratuit** (plan Free)

### 3️⃣ Vercel
**Rôle** : Hébergement du site
- Héberge votre code Next.js
- Build et déploie automatiquement
- Fournit l'infrastructure serveur
- **Gratuit** (plan Hobby)

---

## 🔧 Comment Vérifier Votre Configuration Actuelle

### Dans Hostinger :
1. Connectez-vous à [Hostinger](https://www.hostinger.com)
2. **Domaines** > Sélectionnez votre domaine
3. Regardez **Nameservers** :
   - Si c'est `*.ns.cloudflare.com` → ✅ Configuration correcte
   - Si c'est autre chose → Needs configuration

### Dans Cloudflare :
1. Connectez-vous à [Cloudflare](https://dash.cloudflare.com)
2. Sélectionnez votre site
3. Allez dans **DNS** > **Records**
4. Vous devriez voir :
   ```
   Type A    | @ ou votredomaine.com     | 76.76.21.21 (ou autre IP Vercel)
   Type CNAME| www                       | cname.vercel-dns.com
   ```

### Dans Vercel :
1. Connectez-vous à [Vercel](https://vercel.com)
2. Sélectionnez votre projet
3. **Settings** > **Domains**
4. Vous devriez voir votre domaine listé et "Valid Configuration"

---

## ✅ Configuration Idéale

```yaml
Hostinger:
  Role: Domain Registrar
  Nameservers: 
    - alice.ns.cloudflare.com
    - bob.ns.cloudflare.com
  
Cloudflare:
  Role: DNS + CDN
  DNS Records:
    - Type: A
      Name: @
      Content: 76.76.21.21 (Vercel IP)
      Proxy: ON (nuage orange)
    
    - Type: CNAME
      Name: www
      Content: cname.vercel-dns.com
      Proxy: ON (nuage orange)
  
  SSL/TLS: Full (strict)
  Always Use HTTPS: ON

Vercel:
  Role: Hosting
  Domains:
    - votredomaine.com (Primary)
    - www.votredomaine.com (Redirect to primary)
```

---

## 🆘 Problèmes Courants

### Problème 1 : Site ne charge pas
**Vérifiez** :
```powershell
nslookup votredomaine.com
```
- L'IP doit pointer vers Vercel (76.x.x.x) ou Cloudflare (104.x.x.x)

### Problème 2 : SSL/HTTPS ne fonctionne pas
**Dans Cloudflare** :
- SSL/TLS mode = "Full (strict)" ou "Full"
- Always Use HTTPS = ON

### Problème 3 : Changements DNS ne prennent pas effet
**Attendez** :
- Cloudflare : 5-30 minutes
- Changement nameservers : 1-48 heures

**Videz le cache** :
- Cloudflare Dashboard > Caching > Purge Everything
- Navigateur : Ctrl+Shift+R

---

## 📞 Besoin d'Aide ?

Répondez-moi avec :
1. Votre nom de domaine (si vous voulez)
2. Le résultat de `nslookup -type=NS votredomaine.com`
3. Le résultat de `nslookup votredomaine.com`

Je vous dirai exactement comment c'est configuré ! 🚀

