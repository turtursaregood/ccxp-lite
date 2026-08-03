(function registerCcxpLiteSharedTheme(globalScope: typeof globalThis) {
  const runtimeScope = globalScope;
  const namespace = runtimeScope.CCXP_LITE ?? {};
  const { sharedConstants } = namespace;
  if (!sharedConstants) {
    return;
  }
  const { TOKENS, DARK_TOKENS, ASSETS } = sharedConstants;
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
      "--ccxp-lite-skeleton-surface-start":
        "color-mix(in srgb, var(--ccxp-lite-surface) 60%, var(--ccxp-lite-accent))",
      "--ccxp-lite-skeleton-surface-end":
        "color-mix(in srgb, var(--ccxp-lite-surface) 86%, var(--ccxp-lite-skeleton-surface-end-tint))",
      "--ccxp-lite-tabs-active-surface":
        "color-mix(in srgb, var(--ccxp-lite-surface) 72%, var(--ccxp-lite-accent))",
      "--ccxp-lite-tabs-focus-outline":
        "color-mix(in srgb, var(--ccxp-lite-primary) 45%, var(--ccxp-lite-bg))",
      "--ccxp-lite-danger-flash-transparent":
        "color-mix(in srgb, var(--ccxp-lite-type-danger-color) 0%, var(--ccxp-lite-transparent))",
      "--ccxp-lite-danger-flash-outline":
        "color-mix(in srgb, var(--ccxp-lite-type-danger-color) 78%, var(--ccxp-lite-bg))",
      "--ccxp-lite-danger-flash-shadow":
        "color-mix(in srgb, var(--ccxp-lite-type-danger-color) 14%, var(--ccxp-lite-transparent))",
      "--ccxp-lite-spacing-xs": tokens.spacingXs,
      "--ccxp-lite-spacing-sm": tokens.spacingSm,
      "--ccxp-lite-spacing-md": tokens.spacingMd,
      "--ccxp-lite-spacing-lg": tokens.spacingLg,
      "--ccxp-lite-spacing-xl": tokens.spacingXl,
      "--ccxp-lite-spacing-2xs": tokens.spacing2xs,
      "--ccxp-lite-spacing-3xs": tokens.spacing3xs,
      "--ccxp-lite-spacing-inline-sm": tokens.spacingInlineSm,
      "--ccxp-lite-spacing-inset-sm": tokens.spacingInsetSm,
      "--ccxp-lite-spacing-inset-md": tokens.spacingInsetMd,
      "--ccxp-lite-spacing-inset-lg": tokens.spacingInsetLg,
      "--ccxp-lite-spacing-brand-inline": tokens.spacingBrandInline,
      "--ccxp-lite-spacing-sidebar-search-inset": tokens.spacingSidebarSearchInset,
      "--ccxp-lite-spacing-sidebar-experiment-inset-x": tokens.spacingSidebarExperimentInsetX,
      "--ccxp-lite-spacing-sidebar-experiment-inset-y": tokens.spacingSidebarExperimentInsetY,
      "--ccxp-lite-sidebar-row-padding-y": tokens.sidebarRowPaddingY,
      "--ccxp-lite-sidebar-row-padding-x": tokens.sidebarRowPaddingX,
      "--ccxp-lite-sidebar-row-gap": tokens.sidebarRowGap,
      "--ccxp-lite-sidebar-tree-indent-step": tokens.sidebarTreeIndentStep,
      "--ccxp-lite-radius-xs": tokens.radiusXs,
      "--ccxp-lite-radius-sm": tokens.radiusSm,
      "--ccxp-lite-radius-input": tokens.radiusInput,
      "--ccxp-lite-radius-md": tokens.radiusMd,
      "--ccxp-lite-radius-lg": tokens.radiusLg,
      "--ccxp-lite-radius-brand": tokens.radiusBrand,
      "--ccxp-lite-radius-full": tokens.radiusFull,
      "--ccxp-lite-font-sans": tokens.fontSans,
      "--ccxp-lite-font-brand": tokens.fontBrand,
      "--ccxp-lite-font-weight-regular": tokens.fontWeightRegular,
      "--ccxp-lite-font-weight-strong": tokens.fontWeightStrong,
      "--ccxp-lite-font-weight-heavy": tokens.fontWeightHeavy,
      "--ccxp-lite-font-variant-numeric-tabular": tokens.fontVariantNumericTabular,
      "--ccxp-lite-font-size-caption": tokens.fontSizeCaption,
      "--ccxp-lite-font-size-nav": tokens.fontSizeNav,
      "--ccxp-lite-font-size-utility": tokens.fontSizeUtility,
      "--ccxp-lite-font-size-body": tokens.fontSizeBody,
      "--ccxp-lite-font-size-sidebar-brand": tokens.fontSizeSidebarBrand,
      "--ccxp-lite-size-sidebar-brand-logo": tokens.sizeSidebarBrandLogo,
      "--ccxp-lite-size-sidebar-category-leading": tokens.sizeSidebarCategoryLeading,
      "--ccxp-lite-size-sidebar-control": tokens.sizeSidebarControl,
      "--ccxp-lite-size-sidebar-guide-line": tokens.sizeSidebarGuideLine,
      "--ccxp-lite-size-sidebar-search-spacer": tokens.sizeSidebarSearchSpacer,
      "--ccxp-lite-size-sidebar-search-width": tokens.sizeSidebarSearchWidth,
      "--ccxp-lite-spacing-sidebar-brand-word-gap": tokens.spacingSidebarBrandWordGap,
      "--ccxp-lite-size-sidebar-header-divider-width": tokens.sizeSidebarHeaderDividerWidth,
      "--ccxp-lite-size-sidebar-header-divider-height": tokens.sizeSidebarHeaderDividerHeight,
      "--ccxp-lite-size-sidebar-search-icon": tokens.sizeSidebarSearchIcon,
      "--ccxp-lite-size-sidebar-experiment-switch": tokens.sizeSidebarExperimentSwitch,
      "--ccxp-lite-size-sidebar-experiment-switch-expanded":
        tokens.sizeSidebarExperimentSwitchExpanded,
      "--ccxp-lite-size-landing-brand-logo": tokens.sizeLandingBrandLogo,
      "--ccxp-lite-size-landing-header-height": tokens.sizeLandingHeaderHeight,
      "--ccxp-lite-size-form-control-width": tokens.sizeFormControlWidth,
      "--ccxp-lite-size-login-control-height": tokens.sizeLoginControlHeight,
      "--ccxp-lite-size-password-toggle-offset": tokens.sizePasswordToggleOffset,
      "--ccxp-lite-size-icon-button-sm": tokens.sizeIconButtonSm,
      "--ccxp-lite-size-icon-button-md": tokens.sizeIconButtonMd,
      "--ccxp-lite-size-sidebar-section-icon": tokens.sizeSidebarSectionIcon,
      "--ccxp-lite-size-sidebar-category-card-icon": tokens.sizeSidebarCategoryCardIcon,
      "--ccxp-lite-size-control-min-width": tokens.sizeControlMinWidth,
      "--ccxp-lite-size-control-height-sm": tokens.sizeControlHeightSm,
      "--ccxp-lite-size-control-height-md": tokens.sizeControlHeightMd,
      "--ccxp-lite-size-sidebar-section-card-min-height": tokens.sizeSidebarSectionCardMinHeight,
      "--ccxp-lite-size-sidebar-category-card-min-height": tokens.sizeSidebarCategoryCardMinHeight,
      "--ccxp-lite-size-sidebar-destination-frame-offset": tokens.sizeSidebarDestinationFrameOffset,
      "--ccxp-lite-size-announcement-divider": tokens.sizeAnnouncementDivider,
      "--ccxp-lite-font-size-page-title": tokens.fontSizePageTitle,
      "--ccxp-lite-font-size-display": tokens.fontSizeDisplay,
      "--ccxp-lite-font-size-section-title": tokens.fontSizeSectionTitle,
      "--ccxp-lite-font-size-chip": tokens.fontSizeChip,
      "--ccxp-lite-sidebar-width": tokens.sidebarWidth,
      "--ccxp-lite-landing-max-width": tokens.landingMaxWidth,
      "--ccxp-lite-type-display":
        "var(--ccxp-lite-font-weight-heavy) var(--ccxp-lite-font-size-display)/1.1 var(--ccxp-lite-font-sans)",
      "--ccxp-lite-type-display-color": "var(--ccxp-lite-text)",
      "--ccxp-lite-type-page-title":
        "var(--ccxp-lite-font-weight-strong) var(--ccxp-lite-font-size-page-title)/1.2 var(--ccxp-lite-font-sans)",
      "--ccxp-lite-type-page-title-color": "var(--ccxp-lite-text)",
      "--ccxp-lite-type-primary-link": "var(--ccxp-lite-type-body-strong)",
      "--ccxp-lite-type-primary-link-color": "var(--ccxp-lite-primary)",
      "--ccxp-lite-type-info": "var(--ccxp-lite-type-body-strong)",
      "--ccxp-lite-type-info-color": "var(--ccxp-lite-legacy-blue-text)",
      "--ccxp-lite-type-danger": "var(--ccxp-lite-type-body-strong)",
      "--ccxp-lite-type-danger-color": "var(--ccxp-lite-legacy-red-text)",
      "--ccxp-lite-type-body-strong":
        "var(--ccxp-lite-font-weight-strong) var(--ccxp-lite-font-size-body)/1.55 var(--ccxp-lite-font-sans)",
      "--ccxp-lite-type-body-strong-color": "var(--ccxp-lite-text)",
      "--ccxp-lite-type-body":
        "var(--ccxp-lite-font-weight-regular) var(--ccxp-lite-font-size-body)/1.55 var(--ccxp-lite-font-sans)",
      "--ccxp-lite-type-body-color": "var(--ccxp-lite-text)",
      "--ccxp-lite-type-body-muted":
        "var(--ccxp-lite-font-weight-regular) var(--ccxp-lite-font-size-body)/1.55 var(--ccxp-lite-font-sans)",
      "--ccxp-lite-type-body-muted-color": "var(--ccxp-lite-text-muted)",
      "--ccxp-lite-type-utility":
        "var(--ccxp-lite-font-weight-strong) var(--ccxp-lite-font-size-utility)/1.4 var(--ccxp-lite-font-sans)",
      "--ccxp-lite-type-utility-color": "var(--ccxp-lite-primary)",
      "--ccxp-lite-type-nav": "var(--ccxp-lite-type-utility)",
      "--ccxp-lite-type-nav-color": "var(--ccxp-lite-primary)",
      "--ccxp-lite-type-caption": "var(--ccxp-lite-type-utility)",
      "--ccxp-lite-type-caption-color": "var(--ccxp-lite-text-muted)",
      "--ccxp-lite-type-section-label": "var(--ccxp-lite-type-utility)",
      "--ccxp-lite-type-section-label-color": "var(--ccxp-lite-primary)",
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
