// icons.js
// Import uniquement les icônes utilisées pour réduire la taille du bundle
import { ArrowDownToDot, TableOfContents, StretchHorizontal, LayoutDashboard, PanelLeftDashed, RectangleHorizontal } from 'lucide-react';

// Map des icônes disponibles
const iconMap = {
    ArrowDownToDot,
    TableOfContents,
    StretchHorizontal,
    LayoutDashboard,
    PanelLeftDashed,
    RectangleHorizontal,
};

export const getBlockIcon = (iconName, options = {}) => {
    const Icon = iconMap[iconName];
    if (!Icon) {
        console.warn(`Icon "${iconName}" not found in iconMap. Add it to icons.js`);
        return null;
    }

    const {
        size = 20,
        color = '#F6F6F7',
        background = '#F6F6F7',
        borderRadius = '4px'
    } = options;

    return {
        src: (
            <div style={{
                backgroundColor: background,
                borderRadius,
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={size} color={color} style={{ fill: 'none' }} />
            </div>
        )
    };
};
