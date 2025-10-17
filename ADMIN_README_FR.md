# Panel Admin - Portfolio Designer

## ✨ Ce qui a été créé

Vous disposez maintenant d'un **panel d'administration complet** pour gérer tout le contenu de votre site portfolio, y compris les photos !

## 🎯 Fonctionnalités

### 1. **Authentification Sécurisée**
- Connexion protégée par mot de passe
- Session persistante (7 jours)
- Route: `/admin/login`

### 2. **Gestion des Projets**
✅ Créer, modifier, supprimer des projets  
✅ Upload d'images pour chaque projet  
✅ Éditeur Markdown pour le contenu  
✅ Gestion des métadonnées (client, industrie, timeline, etc.)  
✅ Marquer comme "Featured"  

Route: `/admin/dashboard/projects`

### 3. **Gestion des Articles de Blog**
✅ Créer, modifier, supprimer des articles  
✅ Upload d'image de couverture  
✅ Éditeur Markdown  
✅ Tags et mots-clés SEO  
✅ Marquer comme "Featured"  

Route: `/admin/dashboard/blog`

### 4. **Gestion des Témoignages**
✅ Créer, modifier, supprimer des témoignages  
✅ Note de 1 à 5 étoiles  
✅ Informations du client (nom, rôle, entreprise)  
✅ Marquer comme "Featured"  

Route: `/admin/dashboard/testimonials`

### 5. **Paramètres du Site et Profil**
✅ Modifier vos informations personnelles  
✅ Gérer votre bio, avatar, image hero  
✅ Liens réseaux sociaux  
✅ Statistiques (années d'expérience, clients, etc.)  
✅ Paramètres du site (nom, logo, favicon, etc.)  

Route: `/admin/dashboard/settings`

### 6. **Upload d'Images**
✅ Upload direct depuis n'importe quelle page  
✅ Stockage dans `/public/uploads/`  
✅ Génération automatique d'URL  
✅ Prévisualisation instantanée  

## 🚀 Démarrage Rapide

### 1. Configuration

Créez ou modifiez le fichier `.env.local` à la racine du projet :

```env
# Mot de passe admin (changez-le !)
ADMIN_PASSWORD=votre_mot_de_passe_securise

# Variables existantes (ne pas modifier si déjà configurées)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=YourName Design Studio
CONTACT_TO_EMAIL=hello@yourdesignstudio.com
```

### 2. Démarrer le serveur

```bash
# Installer les dépendances (si nécessaire)
pnpm install

# Lancer le serveur de développement
pnpm dev
```

### 3. Accéder au panel admin

1. Ouvrez votre navigateur : `http://localhost:3000/admin/login`
2. Entrez votre mot de passe admin
3. Vous êtes redirigé vers le dashboard !

## 📋 Structure du Panel

```
/admin
  /login          → Page de connexion
  /dashboard      → Tableau de bord principal
    /projects     → Gestion des projets
      /new        → Créer un nouveau projet
      /[slug]     → Éditer un projet
    /blog         → Gestion des articles
      /new        → Créer un nouvel article
      /[slug]     → Éditer un article
    /testimonials → Gestion des témoignages
    /settings     → Paramètres (profil + site)
  /logout         → Déconnexion
```

## 🗂️ Organisation des Fichiers

Tous les contenus sont stockés dans le dossier `content/` :

```
content/
  ├── projects/           # Projets (.mdx)
  │   ├── mon-projet.mdx
  │   └── autre-projet.mdx
  ├── posts/              # Articles de blog (.mdx)
  │   ├── mon-article.mdx
  │   └── autre-article.mdx
  ├── testimonials/       # Témoignages (.json)
  │   ├── client-1.json
  │   └── client-2.json
  └── settings/           # Paramètres (.json)
      ├── profile.json
      └── site.json

public/
  └── uploads/            # Images uploadées
      ├── 1728847392-mon-image.jpg
      └── 1728847485-autre-image.png
```

## 💡 Guide d'Utilisation

### Créer un Nouveau Projet

1. Allez sur `/admin/dashboard/projects`
2. Cliquez sur "New Project"
3. Remplissez les informations :
   - **Titre** : Le nom de votre projet
   - **Slug** : Se génère automatiquement (vous pouvez le modifier)
   - **Résumé** : Une description courte
   - **Client** : Le nom du client
   - **Industrie** : Sélectionnez dans la liste
   - **Image Hero** : Uploadez ou collez une URL d'image
4. Rédigez le contenu en Markdown dans la section "Body"
5. Cliquez sur "Create Project"

### Upload d'Images

**Méthode 1 : Depuis un formulaire**
1. Trouvez un champ image (Hero Image, Cover Image, etc.)
2. Cliquez sur l'icône "Upload" à côté du champ
3. Sélectionnez votre image
4. L'URL est automatiquement remplie !

**Méthode 2 : URL externe**
- Vous pouvez aussi coller directement une URL d'image externe

### Markdown Basique

Le contenu supporte le Markdown :

```markdown
# Grand Titre
## Sous-titre

**Texte en gras** et *texte en italique*

- Liste à puces
- Deuxième point

[Lien vers un site](https://example.com)

![Image](/uploads/mon-image.jpg)
```

## 🔐 Sécurité

- ✅ Authentification requise pour toutes les routes `/admin/*`
- ✅ Cookies sécurisés (HttpOnly, SameSite)
- ✅ Session de 7 jours
- ✅ Middleware de protection automatique

## 📱 Responsive

Le panel admin fonctionne parfaitement sur :
- 💻 Desktop
- 📱 Tablet
- 📲 Mobile

Vous pouvez gérer votre contenu depuis n'importe quel appareil !

## ⚠️ Important : Sauvegarde en Production

**En développement local :**
Les modifications sont sauvegardées immédiatement dans les fichiers.

**En production (Vercel, Netlify, etc.) :**
Les fichiers sont temporaires. Pour les rendre permanents :

1. Téléchargez les fichiers modifiés depuis le serveur
2. Ou utilisez Git pour committer les changements :

```bash
# Voir les changements
git status

# Ajouter les fichiers modifiés
git add content/ public/uploads/

# Committer
git commit -m "Mise à jour du contenu via admin"

# Pousser
git push origin main
```

**Alternative recommandée :**
Utilisez le panel admin uniquement en local, puis commitez et déployez vos changements.

## 🛠️ Personnalisation

### Changer le mot de passe

Modifiez `ADMIN_PASSWORD` dans `.env.local` et redémarrez le serveur.

### Ajouter des champs

Les fichiers API sont dans `src/app/api/admin/`. Vous pouvez les modifier pour ajouter de nouveaux champs.

### Modifier l'interface

Les composants UI sont dans `src/app/admin/dashboard/`. Modifiez-les selon vos besoins.

## 📚 Documentation Complète

Pour plus de détails, consultez :
- `ADMIN_GUIDE.md` - Guide complet d'utilisation
- `ADMIN_AUTH_SETUP.md` - Configuration de l'authentification (si existant)

## 🐛 Problèmes Courants

### "Unauthorized" lors de la connexion
- Vérifiez que `ADMIN_PASSWORD` est défini dans `.env.local`
- Redémarrez le serveur

### Les images ne s'uploadent pas
- Vérifiez que le dossier `public/uploads/` existe
- Vérifiez les permissions du dossier

### Les modifications ne s'affichent pas
- Actualisez la page du navigateur
- Vérifiez que les fichiers ont été sauvegardés dans `content/`

## ✅ Checklist de Démarrage

- [ ] Créer `.env.local` avec `ADMIN_PASSWORD`
- [ ] Démarrer le serveur avec `pnpm dev`
- [ ] Accéder à `/admin/login`
- [ ] Se connecter avec le mot de passe
- [ ] Explorer le dashboard
- [ ] Créer un premier projet de test
- [ ] Uploader une image de test
- [ ] Vérifier que les fichiers sont créés dans `content/`

## 🎉 Vous êtes prêt !

Votre panel admin est maintenant **100% fonctionnel** !

Vous pouvez gérer :
- ✅ Tous vos projets
- ✅ Tous vos articles de blog
- ✅ Tous vos témoignages
- ✅ Vos paramètres de profil et de site
- ✅ Toutes vos images

**Sans jamais toucher au code !** 🚀

---

**URL d'accès :** `http://localhost:3000/admin/login` (en local)

Pour toute question, consultez `ADMIN_GUIDE.md` ou contactez votre développeur.

Bon courage avec votre portfolio ! 💼✨

