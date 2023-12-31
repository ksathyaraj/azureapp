import { Injectable, Renderer2, Inject, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
/**
 * Theme definition
 * @author Sahil Purav
 */
interface IThemes {
 name: string;
 loaded: boolean;
}
export const STORE: IThemes[] = [{
  name: 'app',
  loaded: false,
 },
 {
  name: 'absa',
  loaded: false,
 },
];
@Injectable({
 providedIn: 'root',
})
export class ThemeLoaderService {
 private _themes: IThemes[] = [];
 private _renderer: Renderer2;
constructor(rendererFactory: RendererFactory2, @Inject(DOCUMENT) private _document: Document, private _http: HttpClient) {
// constructor(rendererFactory: RendererFactory2,private _document: Document, private _http: HttpClient) {
  this._renderer = rendererFactory.createRenderer(null, null);
  this._initialize();
 }
/**
 * Initialize all themes
 * @author Sahil Purav
 */
 private _initialize() {
  STORE.forEach((theme: any) => {
   this._themes[theme.name] = {
    loaded: false,
    name: theme.name
   };
  });
 }
/**
 * Loads themes
 * @param themes all in memory themes
 */
 load(...themes: string[]) {
  console.log(themes)
  const promises: any[] = [];
  themes.forEach(theme => promises.push(this._loadTheme(theme)));
  return Promise.all(promises);
 }
/**
 * Checks if given theme is already loaded
 * @param name name of theme
 */
 private _isThemeLoaded(name: any) {
  if (this._themes[name].loaded) {
   return true;
  }
  return false;
 }
/**
 * Attach theme tag through Renderer2
 * @param name name of theme
 * @author Sahil Purav
 */
 private _renderTheme(name: any) {
  // if (env.production) {
   const style = this._renderer.createElement('link');
   style.rel = 'stylesheet';
   style.type = 'text/css';
   console.log(this._themes)
   style.href = this._themes[name].name + '.css';
   return style;
  // }
//   const script = this._renderer.createElement('script');
//   script.type = 'text/javascript';
//   script.src = this._themes[name] + '.js';
//   return script;
 }
/**
 * get resolve params based on themes status
 * @param name name of script
 * @param status status of script
 */
 private _setThemeStatus(name: any, status = true) {
  this._themes[name].loaded = status;
  return {
     name,
     loaded: status
  };
 }
/**
  * Loads themes
  * @param name name of script
  */
 private _loadTheme(name: string) {
  return new Promise(resolve => {
   if (this._isThemeLoaded(name)) {
    return resolve(this._setThemeStatus(name));
   }
   const theme = this._renderTheme(name);
     theme.onload = () => {
       resolve(this._setThemeStatus(name));
     };
     theme.onerror = () => resolve(this._setThemeStatus(name, false));
       this._renderer.appendChild(this._document.getElementsByTagName('head')[0], theme);
  });
 }
/**
 * Get theme name API and host
 */
 getTheme() {
  return this._http.get('configuration?domain=this._document.location.host');
 }
}