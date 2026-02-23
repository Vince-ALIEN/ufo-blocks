# Guide de démarrage rapide — UFO Blocks

## Installation en 5 minutes

### Étape 1 : Cloner le plugin

```bash
cd wp-content/plugins
git clone https://github.com/Vince-ALIEN/ufo-blocks.git
cd ufo-blocks
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
2. Trouver **"UFO Blocks"**
3. Cliquer sur **"Activer"**

✅ **C'est fait !** Le plugin est prêt à être utilisé.

---

## Premier bloc en 2 minutes

### 1. Créer un nouveau post/page

Aller dans **WordPress Admin → Pages → Ajouter**

### 2. Insérer le bloc ufo Grid

1. Cliquer sur **"+"** (Ajouter un bloc)
2. Rechercher **"ufo Grid"** (catégorie UFO Blocks)
3. Cliquer sur le bloc

### 3. Ajouter des cellules ufo Row

Les blocs **ufo Row** s'insèrent automatiquement à l'intérieur du `ufo Grid`.

### 4. Configurer la grille

**Dans le panneau de droite :**
- Nombre de colonnes : 2
- Espacement (gap) : 4

### 5. Publier

Cliquer sur **"Publier"** et voir le résultat.

---

## Exemples d'utilisation

### Layout 2 colonnes 50/50

```
[ufo Grid] colonnes: 2, gap: 4
  [ufo Row] → contenu gauche
  [ufo Row] → contenu droit
```

### Layout 3 colonnes

```
[ufo Grid] colonnes: 3, gap: 6
  [ufo Row] → Service 1
  [ufo Row] → Service 2
  [ufo Row] → Service 3
```

### Layout asymétrique 70/30

```
[ufo Grid] colonnes: 12, gap: 6
  [ufo Row] col-span: 8 → contenu principal
  [ufo Row] col-span: 4 → sidebar
```

### Grille avec placement précis

```
[ufo Grid] colonnes: 3, lignes: 2
  [ufo Row] col-span: 2, row-span: 2 → grande image
  [ufo Row] → texte haut droite
  [ufo Row] → texte bas droite
```

---

## Astuces rapides

### Inverser l'ordre sur mobile

Activer **"Inverser sur mobile"** dans les options du `ufo Grid` pour inverser l'ordre d'affichage sur petits écrans.

### Image de fond

1. Sélectionner un bloc `ufo Grid` ou `ufo Row`
2. Dans le panneau de droite → **Image de fond**
3. Choisir une image depuis la médiathèque

### Vidéo de fond

Disponible sur le bloc `ufo Grid` via l'option **Vidéo de fond**.

---

## Problèmes courants

### Le bloc ne s'affiche pas

1. Vérifier que le plugin est activé
2. Vider le cache du navigateur (Ctrl+F5)
3. Reconstruire avec `npm run build`

### Les colonnes ne sont pas responsive

- Vérifier que le CSS du plugin est bien chargé
- Si vous utilisez votre propre Tailwind, ajouter les classes `ufo-grid` et `ufo-row` au `content` de votre config

---

## Commandes utiles

```bash
npm start           # Développement avec watch
npm run build       # Build de production
npm run lint:js     # Lint JavaScript
npm run lint:css    # Lint CSS
npm run format      # Formatter le code
```

---

## Prochaines étapes

1. Lire le [README.md](README.md) pour les détails complets
2. Consulter [DEVELOPERS.md](DEVELOPERS.md) pour personnaliser
3. Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour contribuer

---

## Support

- Issues : https://github.com/Vince-ALIEN/ufo-blocks/issues
- Email : contact@ufo-agency.com

---

UFO Agency — https://ufo-agency.com
