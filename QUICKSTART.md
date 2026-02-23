# 🚀 Guide de démarrage rapide - Tailwind Columns Block

## Installation en 5 minutes

### Étape 1 : Télécharger le plugin

```bash
cd wp-content/plugins
git clone [URL_DU_REPO] tailwind-columns-block
cd tailwind-columns-block
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

### Étape 3 : Compiler le plugin

```bash
npm run build
```

### Étape 4 : Activer le plugin

1. Aller dans **WordPress Admin → Extensions**
2. Trouver "Tailwind Columns Block"
3. Cliquer sur "Activer"

✅ **C'est fait !** Le plugin est prêt à être utilisé.

---

## Premier bloc en 2 minutes

### 1. Créer un nouveau post/page

Aller dans **WordPress Admin → Pages → Ajouter**

### 2. Insérer le bloc Columns

1. Cliquer sur le bouton **"+"** (Ajouter un bloc)
2. Rechercher **"Tailwind Columns"**
3. Cliquer sur le bloc

### 3. Configurer vos colonnes

**Dans le panneau de droite :**
- Nombre de colonnes : 2
- Espacement : Moyen (16px)

**Ajouter du contenu :**
1. Cliquer dans la première colonne
2. Ajouter un bloc Paragraphe
3. Taper votre texte
4. Répéter pour la deuxième colonne

### 4. Publier !

Cliquer sur **"Publier"** et voir le résultat.

---

## Exemples d'utilisation

### Layout 2 colonnes 50/50

```
[Tailwind Columns]
  Colonnes: 2
  Gap: 6 (24px)
  
  [Column 1]
    - Image
    - Titre
    - Texte
  
  [Column 2]
    - Image
    - Titre
    - Texte
```

### Layout 3 colonnes avec cards

```
[Tailwind Columns]
  Colonnes: 3
  Gap: 8 (32px)
  
  [Column 1] - Service 1
  [Column 2] - Service 2
  [Column 3] - Service 3
```

### Layout asymétrique 70/30

```
[Tailwind Columns]
  Colonnes: 2
  Gap: 6
  
  [Column 1]
    Largeur: 8 (8/12 = 66%)
    - Contenu principal
  
  [Column 2]
    Largeur: 4 (4/12 = 33%)
    - Sidebar
```

### Layout 4 colonnes features

```
[Tailwind Columns]
  Colonnes: 4
  Gap: 6
  Alignement vertical: Centre
  
  [Column 1] - Feature 1
  [Column 2] - Feature 2
  [Column 3] - Feature 3
  [Column 4] - Feature 4
```

---

## Astuces rapides

### 💡 Astuce 1 : Inverser sur mobile

Pour un layout "Image à gauche, texte à droite" qui devient "Texte puis image" sur mobile :

1. Activer **"Inverser sur mobile"**
2. Mettre l'image dans la colonne de droite
3. Le texte dans la colonne de gauche

### 💡 Astuce 2 : Alignement vertical

Pour centrer verticalement le contenu de vos colonnes :

1. Sélectionner le bloc Columns
2. Cliquer sur l'icône d'alignement dans la barre d'outils
3. Choisir "Aligner au centre"

### 💡 Astuce 3 : Couleurs de fond

1. Sélectionner une Column
2. Dans le panneau de droite → **Color** → **Background**
3. Choisir une couleur

### 💡 Astuce 4 : Espacement interne

1. Sélectionner une Column
2. Dans le panneau de droite → **Dimensions** → **Padding**
3. Ajuster les valeurs

---

## Problèmes courants

### ❌ Le bloc ne s'affiche pas

**Solution :**
1. Vérifier que le plugin est activé
2. Vider le cache du navigateur (Ctrl+F5)
3. Reconstruire avec `npm run build`

### ❌ Les colonnes ne sont pas responsive

**Solution :**
- Le CSS du plugin doit être chargé
- Vérifier dans l'inspecteur que les classes Tailwind sont présentes
- Si vous utilisez votre propre Tailwind, vérifier le safelist

### ❌ Les colonnes ne s'alignent pas correctement

**Solution :**
1. Vérifier le nombre de colonnes vs largeurs personnalisées
2. Les largeurs personnalisées doivent totaliser 12
3. Exemple : 2 colonnes → col-span-6 + col-span-6 = 12

---

## Commandes utiles

```bash
# Développement avec watch
npm start

# Build de production
npm run build

# Linter JavaScript
npm run lint:js

# Linter CSS
npm run lint:css

# Formatter le code
npm run format
```

---

## Prochaines étapes

1. 📖 Lire le [README.md](README.md) pour plus de détails
2. 👨‍💻 Consulter [DEVELOPERS.md](DEVELOPERS.md) pour personnaliser
3. 🤝 Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour contribuer

---

## Support

Besoin d'aide ?

- 📧 Email : contact@ufo-agency.com
- 🐛 Issues : [GitHub Issues](https://github.com/user/tailwind-columns-block/issues)
- 📚 Documentation : Voir les fichiers MD du projet

---

**Bon développement ! 🚀**

UFO Agency - https://ufo-agency.com
