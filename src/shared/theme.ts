(function registerCcxpLiteSharedTheme(globalScope: typeof globalThis) {
  const runtimeScope = globalScope;
  const namespace = runtimeScope.CCXP_LITE ?? {};
  const { sharedConstants } = namespace;
  if (!sharedConstants) {
    return;
  }
  const { TOKENS, DARK_TOKENS, ASSETS } = sharedConstants;
  const tokenVariables = namespace.designTokens?.cssVariables;
  if (!tokenVariables) {
    return;
  }
  const themeVariables = tokenVariables;
  function ensureThemeDocument(targetDocument: Document, scope: string) {
    const { documentElement } = targetDocument;
    documentElement.dataset.ccxpLiteScope = scope;
    const theme = getPersistedTheme();
    documentElement.dataset.ccxpLiteTheme = theme;
    const { sharedDom } = namespace;
    const head = sharedDom?.ensureDocumentHead(targetDocument);
    if (!head) {
      return false;
    }
    const isContextReady = (() => {
      try {
        return !sharedDom || sharedDom.ensureContextValid();
      } catch {
        return false;
      }
    })();
    if (!isContextReady) {
      return false;
    }
    if (!head.querySelector("[data-ccxp-lite-stylesheet='true']")) {
      const runtime = (() => {
        try {
          return sharedDom?.getRuntimeSafely() ?? undefined;
        } catch {
          return undefined;
        }
      })();
      if (!runtime) {
        return false;
      }
      const inlineStyle = targetDocument.createElement("style");
      inlineStyle.textContent =
        "html, body { background-color: var(--ccxp-lite-bg, #ffffff) !important; }";
      head.append(inlineStyle);
      const link = targetDocument.createElement("link");
      link.rel = "stylesheet";
      link.href = runtime.getURL(ASSETS.stylesheetPath);
      link.dataset.ccxpLiteStylesheet = "true";
      head.append(link);
    }
    applyCssVariables(targetDocument.documentElement, buildCssVariables(theme));
    return true;
  }

  function buildCssVariables(theme: "light" | "dark" = getPersistedTheme()) {
    const tokens = theme === "dark" && DARK_TOKENS ? { ...TOKENS, ...DARK_TOKENS } : TOKENS;
    return {
      ...themeVariables,
      "--ccxp-lite-primary": tokens.colorPrimary,
      "--ccxp-lite-accent": tokens.colorAccent,
      "--ccxp-lite-brand": tokens.colorBrand,
      "--ccxp-lite-brand-logo-filter":
        theme === "dark"
          ? "brightness(0) saturate(100%) invert(64%) sepia(21%) saturate(1454%) hue-rotate(264deg) brightness(88%) contrast(85%)"
          : "brightness(0) saturate(100%) invert(19%) sepia(49%) saturate(2697%) hue-rotate(278deg) brightness(89%) contrast(92%)",
      "--ccxp-lite-legacy-blue-text": tokens.colorLegacyBlueText,
      "--ccxp-lite-legacy-red-text": tokens.colorLegacyRedText,
      "--ccxp-lite-bg": tokens.colorBg,
      "--ccxp-lite-surface": tokens.colorSurface,
      "--ccxp-lite-sidebar-surface": tokens.colorSidebarSurface,
      "--ccxp-lite-surface-muted": tokens.colorSurfaceMuted,
      "--ccxp-lite-border": tokens.colorBorder,
      "--ccxp-lite-sidebar-divider-color": tokens.colorSidebarDivider,
      "--ccxp-lite-sidebar-search-surface": tokens.colorSidebarSearchSurface,
      "--ccxp-lite-sidebar-search-gradient-start": tokens.colorSidebarSearchGradientStart,
      "--ccxp-lite-sidebar-search-border": tokens.colorSidebarSearchBorder,
      "--ccxp-lite-primary-focus-border": tokens.colorPrimaryFocusBorder,
      "--ccxp-lite-primary-focus-ring": tokens.colorPrimaryFocusRing,
      "--ccxp-lite-primary-hover-surface": tokens.colorPrimaryHoverSurface,
      "--ccxp-lite-primary-hover-solid": tokens.colorPrimaryHoverSolid,
      "--ccxp-lite-primary-muted-surface": tokens.colorPrimaryMutedSurface,
      "--ccxp-lite-primary-glow": tokens.colorPrimaryGlow,
      "--ccxp-lite-lab-active-surface": tokens.colorLabActiveSurface,
      "--ccxp-lite-lab-active-border": tokens.colorLabActiveBorder,
      "--ccxp-lite-lab-active-text": tokens.colorLabActiveText,
      "--ccxp-lite-lab-inactive-surface": tokens.colorLabInactiveSurface,
      "--ccxp-lite-lab-inactive-border": tokens.colorLabInactiveBorder,
      "--ccxp-lite-lab-inactive-text": tokens.colorLabInactiveText,
      "--ccxp-lite-lab-switch-shadow": tokens.colorLabSwitchShadow,
      "--ccxp-lite-sidebar-search-placeholder": tokens.colorSidebarSearchPlaceholder,
      "--ccxp-lite-text": tokens.colorText,
      "--ccxp-lite-text-muted": tokens.colorTextMuted,
      "--ccxp-lite-transparent": tokens.colorTransparent,
      "--ccxp-lite-skeleton-surface-end-tint": tokens.colorSkeletonSurfaceEndTint,
      "--ccxp-lite-skeleton-highlight-start": tokens.colorSkeletonHighlightStart,
      "--ccxp-lite-skeleton-highlight-soft": tokens.colorSkeletonHighlightSoft,
      "--ccxp-lite-skeleton-highlight-strong": tokens.colorSkeletonHighlightStrong,
    };
  }

  function applyCssVariables(
    targetElement: HTMLElement,
    variables: Readonly<Record<string, string>>,
  ) {
    for (const [name, value] of Object.entries(variables)) {
      targetElement.style.setProperty(name, value);
    }
  }

  function getPersistedTheme(): "light" | "dark" {
    try {
      return globalThis.localStorage.getItem("ccxp-lite-theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  }

  function setPersistedTheme(theme: "light" | "dark") {
    try {
      globalThis.localStorage.setItem("ccxp-lite-theme", theme);
    } catch {
      // Ignore storage write failures.
    }
  }

  function applyThemeToDocument(targetDocument: Document) {
    const scope = targetDocument.documentElement.dataset.ccxpLiteScope;
    if (scope === undefined || scope === "") {
      return;
    }
    const theme = getPersistedTheme();
    // eslint-disable-next-line no-param-reassign
    targetDocument.documentElement.dataset.ccxpLiteTheme = theme;
    applyCssVariables(targetDocument.documentElement, buildCssVariables(theme));
  }

  function updateAllFramesTheme() {
    try {
      // eslint-disable-next-line unicorn/prefer-global-this
      const topWin = window.top ?? window;
      const traverse = (win: Window) => {
        try {
          applyThemeToDocument(win.document);
        } catch {
          // Ignore.
        }
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < win.frames.length; i++) {
          try {
            traverse(win.frames[i]);
          } catch {
            // Ignore.
          }
        }
      };
      traverse(topWin);
    } catch {
      // Ignore.
    }
  }

  namespace.sharedTheme = {
    ensureThemeDocument,
    getPersistedTheme,
    setPersistedTheme,
    applyThemeToDocument,
    updateAllFramesTheme,
  };
})(globalThis);
