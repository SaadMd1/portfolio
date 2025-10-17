# Guide d'utilisation du Panel Admin

## 🚀 Accès au Panel Admin

1. Accédez à : `https://votre-site.com/admin/login`
2. Entrez votre mot de passe admin (configuré dans les variables d'environnement)
3. Vous serez redirigé vers le tableau de bord

## 🔑 Configuration du mot de passe

Le mot de passe admin est défini dans la variable d'environnement `ADMIN_PASSWORD`. 

Pour le configurer :
1. Créez ou modifiez le fichier `.env.local` à la racine du projet
2. Ajoutez : `ADMIN_PASSWORD=votre_mot_de_passe_sécurisé`
3. Redémarrez le serveur de développement

## 📁 Fonctionnalités du Panel Admin

### 1. Gestion des Projets

**Accès :** Dashboard > Manage Projects

**Fonctionnalités :**
- ✅ Voir tous les projets existants
- ✅ Créer un nouveau projet
- ✅ Modifier un projet existant
- ✅ Supprimer un projet
- ✅ Uploader des images
- ✅ Marquer comme "Featured"

**Champs disponibles :**
- Titre et slug (URL)
- Résumé/description
- Client et industrie
- Image hero
- Services fournis
- Matériaux utilisés
- Timeline
- Mots-clés SEO
- Contenu en Markdown
- Date de publication

**Format du contenu :** Markdown (`.mdx`)  
**Emplacement :** `content/projects/`

---

### 2. Gestion des Articles de Blog

**Accès :** Dashboard > Manage Blog

**Fonctionnalités :**
- ✅ Voir tous les articles
- ✅ Créer un nouvel article
- ✅ Modifier un article existant
- ✅ Supprimer un article
- ✅ Uploader une image de couverture
- ✅ Marquer comme "Featured"

**Champs disponibles :**
- Titre et slug (URL)
- Extrait/résumé
- Image de couverture
- Tags et catégories
- Mots-clés SEO
- Contenu en Markdown
- Date de publication
- Auteur

**Format du contenu :** Markdown (`.mdx`)  
**Emplacement :** `content/posts/`

---

### 3. Gestion des Témoignages

**Accès :** Dashboard > Manage Testimonials

**Fonctionnalités :**
- ✅ Voir tous les témoignages
- ✅ Créer un nouveau témoignage
- ✅ Modifier un témoignage existant
- ✅ Supprimer un témoignage
- ✅ Marquer comme "Featured"

**Champs disponibles :**
- ID unique
- Nom du client
- Rôle et entreprise
- Citation/avis
- Note (1-5 étoiles)
- Date de publication

**Format du contenu :** JSON  
**Emplacement :** `content/testimonials/`

---

### 4. Gestion des Paramètres

**Accès :** Dashboard > Site Settings

**Deux sections :**

#### A. Paramètres du Profil
- Nom complet
- Titre professionnel
- Bio courte et longue
- Email, téléphone, localisation
- Images (avatar, hero)
- Réseaux sociaux (LinkedIn, Instagram, Behance, etc.)
- Statistiques (années d'expérience, clients, etc.)
- Compétences et outils

#### B. Paramètres du Site
- Nom du site
- Slogan
- Description
- URL du site
- Logo
- Favicon
- Image OG (pour les réseaux sociaux)

**Format du contenu :** JSON  
**Emplacement :** `content/settings/`

---

### 5. Upload d'Images

**Fonctionnalité disponible partout :**
- Cliquez sur le bouton "Upload" (icône) à côté d'un champ image
- Sélectionnez votre image
- L'image est uploadée dans `/public/uploads/`
- L'URL est automatiquement remplie

**Formats acceptés :** JPG, PNG, WebP, GIF  
**Emplacement :** `public/uploads/`

## 📝 Conseils d'utilisation

### Création d'un Projet

1. Cliquez sur "New Project"
2. Remplissez le titre (le slug se génère automatiquement)
3. Ajoutez une image hero (obligatoire)
4. Rédigez votre contenu en Markdown dans la section "Body"
5. Ajoutez des mots-clés pour le SEO
6. Cliquez sur "Create Project"

### Écriture en Markdown

Le contenu supporte le Markdown complet :

```markdown
# Titre principal
## Sous-titre

**Texte en gras**
*Texte en italique*

- Liste à puces
- Deuxième élément

1. Liste numérotée
2. Deuxième élément

[Lien](https://example.com)

![Image](/uploads/mon-image.jpg)
```

### Optimisation SEO

Pour chaque contenu :
- ✅ Utilisez des mots-clés pertinents
- ✅ Rédigez des titres accrocheurs (50-60 caractères)
- ✅ Écrivez des descriptions claires (150-160 caractères)
- ✅ Ajoutez du texte alt aux images
- ✅ Utilisez des URLs lisibles (slugs)

## 🔐 Sécurité

- ✅ Authentification par mot de passe
- ✅ Session sécurisée (7 jours)
- ✅ Cookies HttpOnly
- ✅ Toutes les routes protégées

**Déconnexion :**
- Cliquez sur "Logout" dans l'en-tête du dashboard
- Ou accédez à `/admin/logout`

## 🚨 Sauvegarde des Données

**Important :** Les modifications sont sauvegardées localement dans les fichiers :

1. **En développement local :**
   - Les changements sont immédiats
   - Les fichiers sont modifiés dans `content/`
   - Committez vos changements avec Git

2. **En production (déploiement continu) :**
   - Les modifications sont temporaires
   - Pour les rendre permanentes, vous devez :
     - Télécharger les fichiers modifiés
     - Les committer dans votre repository Git
     - Ou utiliser le système de déploiement automatique

### Workflow recommandé

```bash
# 1. Après avoir fait vos modifications dans le panel admin
git status

# 2. Voir les changements
git diff

# 3. Ajouter les fichiers modifiés
git add content/

# 4. Committer
git commit -m "Update: ajout nouveau projet via admin panel"

# 5. Pousser vers GitHub
git push origin main
```

## 🎨 Interface

L'interface admin est :
- ✅ Responsive (fonctionne sur mobile, tablette, desktop)
- ✅ Simple et intuitive
- ✅ Avec prévisualisation des images
- ✅ Feedback visuel (toasts) pour chaque action

## ❓ Dépannage

### Je ne peux pas me connecter
- Vérifiez que `ADMIN_PASSWORD` est défini dans `.env.local`
- Redémarrez le serveur après modification du `.env.local`

### Mes modifications ne s'affichent pas
- Actualisez la page
- Vérifiez que les fichiers ont bien été sauvegardés dans `content/`
- En production, vérifiez que le déploiement s'est bien effectué

### L'upload d'image échoue
- Vérifiez que le dossier `public/uploads/` existe
- Vérifiez les permissions du dossier
- Vérifiez la taille de l'image (< 10MB recommandé)

### Erreur "Unauthorized"
- Votre session a expiré, reconnectez-vous
- Vérifiez les cookies de votre navigateur

## 📱 Accès Mobile

Le panel admin fonctionne sur mobile ! Vous pouvez :
- Gérer le contenu depuis votre smartphone
- Uploader des photos directement depuis votre galerie
- Publier des articles en déplacement

## 🆘 Support

Si vous rencontrez des problèmes :
1. Consultez les logs du serveur
2. Vérifiez la console du navigateur (F12)
3. Contactez votre développeur

---

## 🎉 C'est prêt !

Votre panel admin est maintenant opérationnel. Vous pouvez gérer tout le contenu de votre site sans toucher au code !

**URL d'accès :** `https://votre-site.com/admin/login`

Bonne gestion de contenu ! 🚀

