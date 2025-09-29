// components/builder/ThemePanel.tsx
"use client";
import useBuilderStore from "@/store/builderStore";

export function ThemePanel() {
  const { theme, updateThemeColor } = useBuilderStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Colors</h3>
      <div className="flex items-center justify-between">
        <label>Primary</label>
        <input
          type="color"
          value={theme.colors.primary}
          onChange={(e) => {
            updateThemeColor("primary", e.target.value);
          }}
          className="bg-transparent"
        />
      </div>
      <div className="flex items-center justify-between">
        <label>Text</label>
        <input
          type="color"
          value={theme.colors.text}
          onChange={(e) => updateThemeColor("text", e.target.value)}
          className="bg-transparent"
        />
      </div>
      <div className="flex items-center justify-between">
        <label>Background</label>
        <input
          type="color"
          value={theme.colors.background}
          onChange={(e) => {
            updateThemeColor("background", e.target.value);
          }}
          className="bg-transparent"
        />
      </div>
      {/* <div className="flex items-center justify-between">
        <label>Panel Background</label>
        <input
          type="color"
          value={theme.colors.panelBg}
          onChange={(e) => {
            updateThemeColor("panelBg", e.target.value);
          }}
          className="bg-transparent"
        />
      </div> */}
    </div>
  );
}
