import * as adapter from '@astrojs/netlify/netlify-functions.js';
import React, { createElement, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/server';
import { escape } from 'html-escaper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { jsxs, jsx, Fragment as Fragment$1 } from 'react/jsx-runtime';
/* empty css                               */import { v4 } from 'uuid';
import { CSVLink } from 'react-csv';
import 'mime';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import 'path-browserify';
import { compile } from 'path-to-regexp';

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to React that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml = ({ value, name }) => {
	if (!value) return null;
	return createElement('astro-slot', {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value },
	});
};

/**
 * This tells React to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml.shouldComponentUpdate = () => false;

const slotName$1 = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
const reactTypeof = Symbol.for('react.element');

function errorIsComingFromPreactComponent(err) {
	return (
		err.message &&
		(err.message.startsWith("Cannot read property '__H'") ||
			err.message.includes("(reading '__H')"))
	);
}

async function check$1(Component, props, children) {
	// Note: there are packages that do some unholy things to create "components".
	// Checking the $$typeof property catches most of these patterns.
	if (typeof Component === 'object') {
		const $$typeof = Component['$$typeof'];
		return $$typeof && $$typeof.toString().slice('Symbol('.length).startsWith('react');
	}
	if (typeof Component !== 'function') return false;

	if (Component.prototype != null && typeof Component.prototype.render === 'function') {
		return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
	}

	let error = null;
	let isReactComponent = false;
	function Tester(...args) {
		try {
			const vnode = Component(...args);
			if (vnode && vnode['$$typeof'] === reactTypeof) {
				isReactComponent = true;
			}
		} catch (err) {
			if (!errorIsComingFromPreactComponent(err)) {
				error = err;
			}
		}

		return React.createElement('div');
	}

	await renderToStaticMarkup$1(Tester, props, children, {});

	if (error) {
		throw error;
	}
	return isReactComponent;
}

async function getNodeWritable() {
	let nodeStreamBuiltinModuleName = 'stream';
	let { Writable } = await import(/* @vite-ignore */ nodeStreamBuiltinModuleName);
	return Writable;
}

async function renderToStaticMarkup$1(Component, props, { default: children, ...slotted }, metadata) {
	delete props['class'];
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName$1(key);
		slots[name] = React.createElement(StaticHtml, { value, name });
	}
	// Note: create newProps to avoid mutating `props` before they are serialized
	const newProps = {
		...props,
		...slots,
	};
	if (children != null) {
		newProps.children = React.createElement(StaticHtml, { value: children });
	}
	const vnode = React.createElement(Component, newProps);
	let html;
	if (metadata && metadata.hydrate) {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode);
		} else {
			html = await renderToPipeableStreamAsync(vnode);
		}
	} else {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode);
		} else {
			html = await renderToStaticNodeStreamAsync(vnode);
		}
	}
	return { html };
}

async function renderToPipeableStreamAsync(vnode) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let error = undefined;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			onError(err) {
				error = err;
				reject(error);
			},
			onAllReady() {
				stream.pipe(
					new Writable({
						write(chunk, _encoding, callback) {
							html += chunk.toString('utf-8');
							callback();
						},
						destroy() {
							resolve(html);
						},
					})
				);
			},
		});
	});
}

async function renderToStaticNodeStreamAsync(vnode) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let stream = ReactDOM.renderToStaticNodeStream(vnode);
		stream.on('error', (err) => {
			reject(err);
		});
		stream.pipe(
			new Writable({
				write(chunk, _encoding, callback) {
					html += chunk.toString('utf-8');
					callback();
				},
				destroy() {
					resolve(html);
				},
			})
		);
	});
}

/**
 * Use a while loop instead of "for await" due to cloudflare and Vercel Edge issues
 * See https://github.com/facebook/react/issues/24169
 */
async function readResult(stream) {
	const reader = stream.getReader();
	let result = '';
	const decoder = new TextDecoder('utf-8');
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (value) {
				result += decoder.decode(value);
			} else {
				// This closes the decoder
				decoder.decode(new Uint8Array());
			}

			return result;
		}
		result += decoder.decode(value, { stream: true });
	}
}

async function renderToReadableStreamAsync(vnode) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode));
}

const _renderer1 = {
	check: check$1,
	renderToStaticMarkup: renderToStaticMarkup$1,
};

const ASTRO_VERSION = "1.6.2";

function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLString extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};
function isHTMLString(value) {
  return Object.prototype.toString.call(value) === "[object HTMLString]";
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      return chunk.toString();
    }
  }
}
class HTMLParts {
  constructor() {
    this.parts = "";
  }
  append(part, result) {
    if (ArrayBuffer.isView(part)) {
      this.parts += decoder.decode(part);
    } else {
      this.parts += stringifyChunk(result, part);
    }
  }
  toString() {
    return this.parts;
  }
  toArrayBuffer() {
    return encoder.encode(this.parts);
  }
}

const ClientOnlyPlaceholder = "astro-client-only";
const skipAstroJSXCheck = /* @__PURE__ */ new WeakSet();
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement$1(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skipAstroJSXCheck.add(vnode.type);
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function" && !skipAstroJSXCheck.has(vnode.type)) {
        useConsoleFilter();
        try {
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2 && output2[AstroJSX]) {
            return await renderJSX(result, output2);
          } else if (!output2) {
            return await renderJSX(result, output2);
          }
        } catch (e) {
          skipAstroJSXCheck.add(vnode.type);
        } finally {
          finishUsingConsoleFilter();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponent(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponent(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let parts = new HTMLParts();
        for await (const chunk of output) {
          parts.append(chunk, result);
        }
        return markHTMLString(parts.toString());
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement$1(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, JSON.stringify(Array.from(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      if (value) {
        extracted.props[key.slice(0, -5)] = serializeListValue(value);
      }
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

class SlotString extends HTMLString {
  constructor(content, instructions) {
    super(content);
    this.instructions = instructions;
  }
}
async function renderSlot(_result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  return fallback;
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof SlotString) {
    if (child.instructions) {
      yield* child.instructions;
    }
    yield child;
  } else if (isHTMLString(child)) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    yield* renderAstroComponent(child);
  } else if (ArrayBuffer.isView(child)) {
    yield child;
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    yield* child;
  } else {
    yield child;
  }
}

function validateComponentProps(props, displayName) {
  var _a;
  if (((_a = {"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true}) == null ? void 0 : _a.DEV) && props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
async function* renderAstroComponent(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let parts = new HTMLParts();
  for await (const chunk of renderAstroComponent(Component)) {
    parts.append(chunk, result);
  }
  return parts.toString();
}
async function renderToIterable(result, componentFactory, displayName, props, children) {
  validateComponentProps(props, displayName);
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    console.warn(
      `Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`
    );
    const response = Component;
    throw response;
  }
  return renderAstroComponent(Component);
}
async function renderTemplate(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toAttributeString(toStyleString(value), shouldEscape)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue (jsx)"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}
function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }
  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }
  if (isAstroComponentFactory(Component)) {
    return "astro-factory";
  }
  return "unknown";
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a;
  Component = await Component ?? Component;
  switch (getComponentType(Component)) {
    case "fragment": {
      const children2 = await renderSlot(result, slots == null ? void 0 : slots.default);
      if (children2 == null) {
        return children2;
      }
      return markHTMLString(children2);
    }
    case "html": {
      const { slotInstructions: slotInstructions2, children: children2 } = await renderSlots(result, slots);
      const html2 = Component.render({ slots: children2 });
      const hydrationHtml = slotInstructions2 ? slotInstructions2.map((instr) => stringifyChunk(result, instr)).join("") : "";
      return markHTMLString(hydrationHtml + html2);
    }
    case "astro-factory": {
      async function* renderAstroComponentInline() {
        let iterable = await renderToIterable(result, Component, displayName, _props, slots);
        yield* iterable;
      }
      return renderAstroComponentInline();
    }
  }
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(_props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new Error(
      `${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`
    );
  }
  if (!html && typeof Component === "string") {
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroComponent(
      await renderTemplate`<${Component}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Component) ? `/>` : `>${childSlots}</${Component}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    return async function* () {
      if (slotInstructions) {
        yield* slotInstructions;
      }
      if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
        yield html;
      } else {
        yield markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
      }
    }();
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    if (slotInstructions) {
      yield* slotInstructions;
    }
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement("astro-island", island, false));
  }
  return renderAll();
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
function renderHead(result) {
  result._metadata.hasRenderedHead = true;
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function __astro_tag_component__(Component, rendererName) {
  if (!Component)
    return;
  if (typeof Component !== "function")
    return;
  Object.defineProperty(Component, Renderer, {
    value: rendererName,
    enumerable: false,
    writable: false
  });
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (slotAttr) => slotAttr;
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [Renderer]: "astro:jsx",
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const $$Astro$3 = createAstro("C:/Users/105297006/Desktop/fieldScheduler/src/layouts/Layout.astro", "", "file:///C:/Users/105297006/Desktop/fieldScheduler/");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<link rel="icon" type="image/svg+xml" href="./src/assets/svg/icon.svg">
		<meta name="generator"${addAttribute(Astro2.generator, "content")}>
		<title>${title}</title>
	${renderHead($$result)}</head>
	<body>
		${renderSlot($$result, $$slots["default"])}
	</body></html>`;
});

const firebaseConfig = {
  apiKey: "AIzaSyCNMLzz75yQeN9ZGdBF0UtCOtQ8BhGhTj4",
  authDomain: "churchill-field-booker.firebaseapp.com",
  projectId: "churchill-field-booker",
  storageBucket: "churchill-field-booker.appspot.com",
  messagingSenderId: "757407358341",
  appId: "1:757407358341:web:5e44a898ce11e4481938ec",
  measurementId: "G-Z0HWMX3D0V"
};
const firebaseApp = initializeApp(firebaseConfig);

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: firebaseApp
}, Symbol.toStringTag, { value: 'Module' }));

const auth = getAuth(firebaseApp);

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: auth
}, Symbol.toStringTag, { value: 'Module' }));

const Login = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState(0);
  const [errorContent, setErrorContent] = useState("");
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const login = async () => {
    try {
      const emailRaw = emailRef.current;
      setEmail(emailRaw.value);
      const password = passwordRef.current;
      const userRaw = await signInWithEmailAndPassword(auth, email, password.value);
      setUser(userRaw.user);
    } catch (errorRaw) {
      const stringErr = errorRaw.code.split("-")[1];
      if (stringErr === "email") {
        setError(1);
        setErrorContent("Invalid Email please try again!!");
      } else if (stringErr === "password") {
        setErrorContent("Invalid Password please try again!!");
        setError(2);
      } else {
        setErrorContent("Error try again!!");
        setError(3);
      }
    }
  };
  useEffect(() => {
    if (user) {
      window.location.href = "/main";
    }
  }, [user]);
  const forgotPassword = () => {
  };
  return /* @__PURE__ */ jsxs("div", {
    className: " absolute inset-0 m-auto flex h-fit w-fit flex-col text-invert",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "absolute inset-x-0 mx-auto h-fit w-fit text-center text-2xl font-bold ",
      children: "Sign In"
    }), /* @__PURE__ */ jsxs("div", {
      className: "bot-dash field relative my-auto mt-16 mb-4 flex w-full flex-col",
      children: [/* @__PURE__ */ jsx("input", {
        ref: emailRef,
        autoComplete: "off",
        placeholder: " ",
        type: "text",
        id: "email",
        className: "input h-8 w-52 overflow-hidden rounded-md border-0 outline-0"
      }), /* @__PURE__ */ jsx("label", {
        htmlFor: "email",
        className: "label text-lg ",
        children: "Username"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "bot-dash field relative my-auto mt-16 mb-4 flex w-full flex-col",
      children: [/* @__PURE__ */ jsx("input", {
        ref: passwordRef,
        placeholder: " ",
        type: "password",
        id: "password",
        className: "input h-8 w-52 overflow-hidden rounded-md border-0 outline-0"
      }), /* @__PURE__ */ jsx("label", {
        htmlFor: "password",
        className: "label text-lg ",
        children: "Password"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col items-center gap-2",
      children: [/* @__PURE__ */ jsx("button", {
        type: "button",
        onClick: forgotPassword,
        className: "text-blue underline hover:text-blue-300",
        children: "Forgot Password"
      }), /* @__PURE__ */ jsx("p", {
        className: `text-red h-fit w-fit text-center font-bold duration-75 ${error !== 0 ? "opacity-100" : "opacity-0"}`,
        children: errorContent
      }), /* @__PURE__ */ jsx("button", {
        type: "button",
        onClick: login,
        className: `${error !== 0 ? "bg-red-700" : "bg-dim"}  w-fit rounded-sm p-2 shadow-lg duration-75 hover:scale-125 active:scale-90`,
        children: "Login"
      })]
    })]
  });
};
__astro_tag_component__(Login, "@astrojs/react");

const sun = "/assets/sun.669111f8.svg";

const moon = "/assets/moon.b0940a74.svg";

const Bg = ({
  children,
  theme
}) => /* @__PURE__ */ jsxs("div", {
  className: `gradient absolute m-0 box-border h-screen w-screen  ${theme ? "light" : "dark"} `,
  children: [" ", children]
});
__astro_tag_component__(Bg, "@astrojs/react");

const App = ({
  children
}) => {
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => {
    setTheme((prev) => !prev);
  };
  useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem("dark")));
  }, []);
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(theme));
  }, [theme]);
  return /* @__PURE__ */ jsxs(Bg, {
    theme,
    children: [/* @__PURE__ */ jsx("button", {
      title: `Change to ${theme ? "dark" : "light"} mode`,
      type: "button",
      onClick: toggleTheme,
      className: `smooth absolute top-4 left-4 h-8 w-8 hover:scale-110 active:scale-90 ${theme ? "invert" : ""}`,
      children: /* @__PURE__ */ jsx("img", {
        src: theme ? sun : moon,
        alt: "Dark/Light mode toggle button"
      })
    }), children]
  });
};
__astro_tag_component__(App, "@astrojs/react");

const MainPage$1 = () => /* @__PURE__ */ jsx(App, {
  children: /* @__PURE__ */ jsx(Login, {})
});
__astro_tag_component__(MainPage$1, "@astrojs/react");

const $$Astro$2 = createAstro("C:/Users/105297006/Desktop/fieldScheduler/src/pages/index.astro", "", "file:///C:/Users/105297006/Desktop/fieldScheduler/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login" }, { "default": () => renderTemplate`${renderComponent($$result, "LoginPage", MainPage$1, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/LoginPage", "client:component-export": "default" })}` })}`;
});

const $$file$2 = "C:/Users/105297006/Desktop/fieldScheduler/src/pages/index.astro";
const $$url$2 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const divisions = [
	{
		label: "Div 1",
		value: 1
	},
	{
		label: "Div 2",
		value: 2
	},
	{
		label: "Div 3",
		value: 3
	}
];
const schools = [
	{
		label: "Churchill",
		value: 1
	},
	{
		label: "Bowness",
		value: 2
	},
	{
		label: "Thirsk",
		value: 3
	}
];
const seniorities = [
	{
		label: "Senior",
		value: 1
	},
	{
		label: "Junior",
		value: 2
	}
];
const rugby = {
	template: [
		[
			"Home Team",
			"Visitor Team",
			"Start Date (MM/DD/YYYY)",
			"Start Time (HH:MM AA)",
			"Duration (minutes)",
			"Details",
			"Show Details",
			"League Name",
			"Practice Type (Shared or Full)",
			"Schedule Name",
			"Venue"
		]
	],
	months: [
		2,
		3,
		4,
		5
	],
	events: {
		"2": [
			15,
			16,
			17
		],
		"3": [
			18,
			20
		],
		"4": [
			6,
			17,
			27
		],
		"5": [
			8,
			21,
			30
		]
	},
	teams: {
		"1": "Team",
		"2": "Team",
		"3": "Team",
		"4": "Team",
		"5": "Team",
		"6": "Team",
		"7": "Team",
		"8": "Team",
		"9": "Team",
		"10": "Team",
		"11": "Team",
		"12": "Team"
	}
};
const soccer = {
	months: [
		1,
		2,
		3,
		4
	],
	events: {
		"2": [
			12,
			17,
			22
		],
		"3": [
			8,
			22
		],
		"4": [
			7,
			9,
			20
		],
		"5": [
			2,
			11,
			23
		]
	},
	teams: {
		"1": "Team",
		"2": "Team",
		"3": "Team",
		"4": "Team",
		"5": "Team",
		"6": "Team",
		"7": "Team",
		"8": "Team",
		"9": "Team",
		"10": "Team",
		"11": "Team",
		"12": "Team"
	}
};
const data = {
	divisions: divisions,
	schools: schools,
	seniorities: seniorities,
	rugby: rugby,
	soccer: soccer
};

const Sport = ({
  children
}) => /* @__PURE__ */ jsx("main", {
  className: "absolute bottom-0 flex h-[92%] w-full flex-row overflow-hidden ",
  children
});
__astro_tag_component__(Sport, "@astrojs/react");

const arrow = "/assets/arrow.325f8566.svg";

const SideBtn = ({
  side,
  state,
  setState
}) => /* @__PURE__ */ jsx("section", {
  className: " hover-fade group grid w-12 shrink-0 place-content-center pt-4 ",
  children: /* @__PURE__ */ jsx("button", {
    title: "Close right pane",
    type: "button",
    onClick: () => setState((prev) => !prev),
    className: ` h-8 w-8 rounded-md bg-base p-2 shadow-lg duration-100 ease-in-out hover:scale-110 active:scale-95 ${state ? `rotate-${side ? "180" : "0"} ` : `translate-x-[${side ? "200%" : "-200%"}] group-hover:translate-x-0 rotate-${side ? "0" : "180"}`}`,
    children: /* @__PURE__ */ jsx("img", {
      className: "inv absolute inset-0 m-auto h-4  w-4",
      src: arrow,
      alt: "side pane open button"
    })
  })
});
__astro_tag_component__(SideBtn, "@astrojs/react");

const caret = "/assets/caret.4f81ff0d.svg";

const Calendar = ({
  month,
  events,
  hover
}) => {
  const year = 2022;
  const date = new Date(year, month);
  const firstDayIndex = date.getDay() - 1;
  const getDaysInMonth = (yearArg, monthArg) => new Date(yearArg, monthArg, 0).getDate();
  let lastDay = getDaysInMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month + 1);
  const firstDays = [];
  lastDay -= firstDayIndex;
  for (let i = 0; i <= firstDayIndex; i++) {
    firstDays.push(lastDay);
    lastDay++;
  }
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  const daysLeft = 42 - (firstDays.length + days.length);
  const lastDays = [];
  for (let i = 1; i <= daysLeft; i++) {
    lastDays.push(i);
  }
  const currentWeekEnds = [];
  const dayThing = (yearArg, i, arr) => {
    const nextDate = new Date(yearArg, month, i);
    if (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
      arr.push(i);
    }
  };
  for (let i = 1; i <= daysInMonth; i++) {
    dayThing(year, i, currentWeekEnds);
  }
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  let index = 0;
  return /* @__PURE__ */ jsxs("button", {
    type: "button",
    className: ` relative m-auto aspect-square w-full rounded-lg bg-neo p-2 shadow-2xl duration-150 ease-in-out ${hover ? "hover:scale-105" : null} `,
    children: [/* @__PURE__ */ jsx("h1", {
      className: "inset-0 mx-auto my-2 h-fit w-fit text-center text-2xl font-bold text-invert",
      children: months[month]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid-rows-7 text-md grid h-full grid-cols-7 text-center",
      children: [weekDays.map((day) => /* @__PURE__ */ jsx("div", {
        className: "h-full w-full text-center font-bold text-stark",
        children: day
      }, v4())), firstDays.map(() => /* @__PURE__ */ jsx("div", {
        className: " relative h-full w-full cursor-pointer",
        children: /* @__PURE__ */ jsx("p", {
          className: "absolute inset-0 m-auto h-fit w-fit",
          children: " "
        })
      }, v4())), days.map((day) => {
        if (currentWeekEnds.includes(day)) {
          return /* @__PURE__ */ jsx("div", {
            className: "relative h-full w-full cursor-pointer text-dim",
            children: /* @__PURE__ */ jsx("p", {
              className: "absolute inset-0 m-auto h-fit w-fit",
              children: day
            })
          }, v4());
        }
        if (events[index] === day) {
          index++;
          return /* @__PURE__ */ jsx("div", {
            className: "h-11/12 relative aspect-square w-11/12 cursor-pointer rounded-full bg-blue-600",
            children: /* @__PURE__ */ jsx("p", {
              className: "absolute inset-0 m-auto h-fit w-fit font-bold text-invert ",
              children: day
            })
          }, v4());
        }
        return /* @__PURE__ */ jsx("div", {
          className: "h-11/12 relative aspect-square w-11/12 cursor-pointer text-stark hover:rounded-full hover:bg-blue-800 hover:text-invert",
          children: /* @__PURE__ */ jsx("p", {
            className: "absolute inset-0 m-auto h-fit w-fit",
            children: day
          })
        }, v4());
      }), lastDays.map(() => /* @__PURE__ */ jsx("div", {
        className: "relative h-full w-full cursor-pointer",
        children: /* @__PURE__ */ jsx("p", {
          className: "absolute inset-0 m-auto h-fit w-fit",
          children: " "
        })
      }, v4()))]
    })]
  });
};
__astro_tag_component__(Calendar, "@astrojs/react");

const Title = ({
  text
}) => /* @__PURE__ */ jsx("div", {
  className: "relative mt-2 h-10  w-[95%] rounded-md bg-base text-stark shadow-lg",
  children: /* @__PURE__ */ jsx("h1", {
    className: "absolute inset-0 m-auto h-fit w-fit text-xl font-bold",
    children: text
  })
});
__astro_tag_component__(Title, "@astrojs/react");

const Download = () => /* @__PURE__ */ jsx(CSVLink, {
  filename: "test.csv",
  data: rugby.template,
  children: /* @__PURE__ */ jsxs("button", {
    type: "button",
    className: "group m-2 flex h-14 w-[3rem] items-center overflow-hidden rounded-lg bg-base  p-2 duration-75 ease-in-out hover:w-[10rem] hover:scale-110 active:scale-90",
    children: [/* @__PURE__ */ jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      className: "absolute h-8 w-8 fill-stark",
      children: /* @__PURE__ */ jsx("path", {
        d: "M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zM432 456c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z"
      })
    }), /* @__PURE__ */ jsx("p", {
      className: "h-fit w-fit translate-x-[-150%] whitespace-nowrap text-stark  duration-300 group-hover:translate-x-[40%]",
      children: "Download Csv"
    })]
  })
});
__astro_tag_component__(Download, "@astrojs/react");

const seasonIcon = "/assets/year.3b4897dd.svg";

const monthIcon = "/assets/calendar.70bc5c69.svg";

const weekIcon = "/assets/week.cc1d95ef.svg";

const dayIcon = "/assets/day.fb7b8a51.svg";

const ViewBtn = ({
  setIconState,
  iconNum
}) => {
  const icons = [seasonIcon, monthIcon, weekIcon, dayIcon];
  const texts = ["Season", "Month", "Week", "Day"];
  return /* @__PURE__ */ jsx("button", {
    onClick: setIconState,
    type: "button",
    className: " no-move smooth absolute top-0 left-0 m-2 h-fit w-fit hover:scale-110 active:scale-90",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex items-center gap-2",
      children: [/* @__PURE__ */ jsx("img", {
        className: "inv-1 no-move h-8 w-8 ",
        src: icons[iconNum],
        alt: ""
      }), /* @__PURE__ */ jsx("p", {
        className: " h-fit w-fit font-bold text-base",
        children: texts[iconNum]
      })]
    })
  });
};
__astro_tag_component__(ViewBtn, "@astrojs/react");

const WeekCaret = ({
  top,
  func
}) => /* @__PURE__ */ jsx("button", {
  onClick: func,
  type: "button",
  children: /* @__PURE__ */ jsx("img", {
    src: caret,
    alt: "",
    className: `absolute inset-x-0 mx-auto h-8 w-8 ${top ? "top-[-2rem] rotate-180 " : "bottom-[-2rem]"} smooth inv-1 hover:scale-110 active:scale-90 `
  })
});
__astro_tag_component__(WeekCaret, "@astrojs/react");

const Middle = ({
  title,
  events
}) => {
  const {
    months
  } = data.rugby;
  const [active, setActive] = useState(0);
  const setIcon = () => {
    if (active === 3) {
      setActive(0);
      return;
    }
    setActive((prev) => prev += 1);
  };
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const [week, setWeek] = useState(8);
  const [month, setMonth] = useState(2);
  const incWeek = () => {
    if (week + 1 <= 52) {
      setWeek((prev) => prev += 1);
    }
  };
  const decWeek = () => {
    if (week - 1 >= 1) {
      setWeek((prev) => prev -= 1);
    }
  };
  const incMonth = () => {
    if (month + 1 <= 5) {
      setMonth((prev) => prev += 1);
    }
  };
  const decMonth = () => {
    if (month - 1 >= 2) {
      setMonth((prev) => prev -= 1);
    }
  };
  return /* @__PURE__ */ jsxs("section", {
    className: "hover-fade relative flex h-full w-full flex-col overflow-hidden",
    children: [/* @__PURE__ */ jsx("section", {
      className: "h-16 w-full p-3",
      children: /* @__PURE__ */ jsx(Title, {
        text: title
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "relative h-12 w-full shrink-0 ",
      children: /* @__PURE__ */ jsx(ViewBtn, {
        setIconState: setIcon,
        iconNum: active
      })
    }), /* @__PURE__ */ jsxs("section", {
      className: "my-col-2 relative grid h-auto w-full grow auto-rows-auto place-content-center justify-evenly gap-4 overflow-hidden p-8 duration-300 ease-in-out",
      children: [active === 0 ? /* @__PURE__ */ jsx(Fragment$1, {
        children: months.map((monthParam) => /* @__PURE__ */ jsx(Calendar, {
          events: events[monthParam],
          month: monthParam,
          hover: true
        }, v4()))
      }) : null, active === 1 ? /* @__PURE__ */ jsxs("div", {
        className: "absolute inset-0 m-auto flex h-fit w-[30rem] ",
        children: [/* @__PURE__ */ jsx("button", {
          type: "button",
          onClick: decMonth,
          children: /* @__PURE__ */ jsx("img", {
            src: caret,
            alt: "",
            className: "smooth inv-1 h-16 w-16 rotate-90 hover:scale-110 active:scale-95"
          })
        }), /* @__PURE__ */ jsx(Calendar, {
          events: events[2],
          month
        }, v4()), /* @__PURE__ */ jsx("button", {
          type: "button",
          onClick: incMonth,
          children: /* @__PURE__ */ jsx("img", {
            src: caret,
            alt: "",
            className: "smooth inv-1 h-16 w-16 rotate-[270deg] hover:scale-110 active:scale-95"
          })
        })]
      }) : null, active === 2 ? /* @__PURE__ */ jsxs("div", {
        className: "relative flex h-48 w-full bg-mid",
        children: [/* @__PURE__ */ jsxs("h1", {
          className: "absolute inset-x-0 top-[-5rem] mx-auto h-fit w-fit text-[2rem] font-bold text-invert",
          children: ["Week ", week]
        }), /* @__PURE__ */ jsx(WeekCaret, {
          func: incWeek,
          top: true
        }), weekDays.map((day) => /* @__PURE__ */ jsxs(Fragment$1, {
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex h-fit w-full justify-around bg-bug",
            children: /* @__PURE__ */ jsx("p", {
              children: day
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "h-full w-auto border border-black bg-green-500"
          })]
        })), /* @__PURE__ */ jsx(WeekCaret, {
          func: decWeek
        })]
      }) : null, active === 3 ? /* @__PURE__ */ jsx("div", {
        className: "absolute inset-0 m-auto h-fit w-fit text-2xl text-bug font-bold",
        children: "Day tbd ..."
      }) : null]
    }), /* @__PURE__ */ jsx("div", {
      className: "grid h-[10%] w-full place-content-center ",
      children: /* @__PURE__ */ jsx(Download, {})
    })]
  });
};
__astro_tag_component__(Middle, "@astrojs/react");

const FilterChip = ({
  selected
}) => {
  const [empty, setEmpty] = useState(true);
  useEffect(() => {
    if (selected.length !== 0) {
      setEmpty(false);
    }
  }, [selected]);
  return /* @__PURE__ */ jsx("div", {
    className: ` flex w-full ${empty ? "h-0" : "h-10"} smooth my-1 shrink-0 gap-4 px-4`,
    children: selected.map((val) => /* @__PURE__ */ jsx("div", {
      id: val.label,
      className: "smooth h-fit w-fit rounded-full bg-base px-4 py-2 text-stark",
      children: val.label
    }, v4()))
  });
};
__astro_tag_component__(FilterChip, "@astrojs/react");

const Select = ({
  title,
  setSelected,
  options,
  selected
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);
  const clearOptions = () => {
    setSelected([]);
  };
  const selectOption = (option) => {
    if (!selected.map((elm) => elm.label).includes(option.label)) {
      setSelected([...selected, option]);
    }
  };
  const isOptionSelected = (option) => selected.map((elm) => elm.value).includes(option.value);
  useEffect(() => {
    if (isOpen)
      setHighlightedIndex(0);
  }, [isOpen]);
  useEffect(() => {
    const handler = (e) => {
      if (e.target !== containerRef.current)
        return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen)
            selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    const effectRef = containerRef;
    effectRef.current?.addEventListener("keydown", handler);
    return () => {
      effectRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options, selectOption]);
  return /* @__PURE__ */ jsxs("button", {
    title: "Click to select filters",
    type: "button",
    onBlur: () => setIsOpen(false),
    onClick: () => setIsOpen((prev) => !prev),
    tabIndex: 0,
    className: "relative flex  w-fit min-w-[1.5em] shrink-0 select-none items-center  gap-[0.5em] rounded-md bg-base p-[0.5em] text-stark shadow-lg outline-none duration-75 ease-in-out hover:scale-110 focus:border-blue-400",
    children: [/* @__PURE__ */ jsx("p", {
      className: "truncate",
      children: title
    }), /* @__PURE__ */ jsx("svg", {
      onClick: (e) => {
        e.stopPropagation();
        clearOptions();
      },
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      className: "smooth h-4 w-4 cursor-pointer fill-stark p-0  hover:fill-red-700",
      children: /* @__PURE__ */ jsx("path", {
        d: "M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"
      })
    }), /* @__PURE__ */ jsx("img", {
      src: caret,
      alt: "Filter dropdown caret",
      className: `h-4 w-4 ${isOpen ? "rotate-180" : ""} inv duration-75 ease-in-out`
    }), /* @__PURE__ */ jsx("div", {
      className: ` absolute m-0  flex list-none flex-col  bg-[rgba(0,0,0,0.5)] p-0 ${isOpen ? `h-[${40 * options.length}px]` : "h-0"}  top-calc left-0 w-full overflow-y-hidden rounded-[0.25em]  duration-300 ease-in-out `,
      children: options.map((option, index) => /* @__PURE__ */ jsx("option", {
        onClick: (e) => {
          e.stopPropagation();
          selectOption(option);
          setIsOpen(false);
        },
        onMouseEnter: () => setHighlightedIndex(index),
        className: `m-2 cursor-pointer z-50 truncate rounded-md  py-[0.5em] text-center ${isOptionSelected(option) ? "bg-blue-700" : "bg-base"} ${index === highlightedIndex ? "bg-blue-300 text-invert" : ""} `,
        children: option.label
      }, option.value))
    })]
  });
};
__astro_tag_component__(Select, "@astrojs/react");

const Left = ({
  leftOpen,
  teams
}) => {
  const [divSelect, setDivSelect] = useState([]);
  const [schoolSelect, setSchoolSelect] = useState([]);
  const [senioritySelect, setSenioritySelect] = useState([]);
  return /* @__PURE__ */ jsxs("section", {
    className: ` ${leftOpen ? "w-1/2" : "w-0 translate-x-[-100%]"} hover-fade relative flex h-full  flex-col  overflow-hidden rounded-bl-xl`,
    children: [/* @__PURE__ */ jsx("div", {
      className: "h-16 w-full p-3 ",
      children: /* @__PURE__ */ jsx(Title, {
        text: "Filters"
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex h-10 w-full justify-around ",
      children: [/* @__PURE__ */ jsx(Select, {
        options: divisions,
        title: "Div n",
        selected: divSelect,
        setSelected: (o) => setDivSelect(o)
      }), /* @__PURE__ */ jsx(Select, {
        options: schools,
        title: "School",
        selected: schoolSelect,
        setSelected: (o) => setSchoolSelect(o)
      }), /* @__PURE__ */ jsx(Select, {
        options: seniorities,
        title: "Sr/Jr",
        selected: senioritySelect,
        setSelected: (o) => setSenioritySelect(o)
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "h-4"
    }), /* @__PURE__ */ jsx(FilterChip, {
      options: divisions,
      selected: divSelect
    }), /* @__PURE__ */ jsx(FilterChip, {
      options: schools,
      selected: schoolSelect
    }), /* @__PURE__ */ jsx(FilterChip, {
      options: seniorities,
      selected: senioritySelect
    }), /* @__PURE__ */ jsx("div", {
      className: " grid flex-grow grid-cols-3 gap-4 p-2 z-[1]",
      children: Object.keys(teams).map((team) => /* @__PURE__ */ jsx("div", {
        className: "smooth relative h-full w-full cursor-pointer no-move rounded-md bg-base text-stark shadow-xl hover:scale-105 active:scale-90",
        children: /* @__PURE__ */ jsxs("p", {
          className: "absolute inset-0 m-auto h-fit w-fit",
          children: [teams[Number(team)], " ", team]
        })
      }, v4()))
    })]
  });
};
__astro_tag_component__(Left, "@astrojs/react");

const DatePicker = () => {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  const [open, setOpen] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs(Fragment$1, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "smooth flex h-fit w-fit select-none items-center justify-around gap-2 rounded-lg bg-mid p-2  text-stark shadow-xl hover:scale-110",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "h-fit w-fit",
        children: [dd, "/", mm, "/", yyyy]
      }), /* @__PURE__ */ jsx("button", {
        type: "button",
        onClick: handleClick,
        className: "smooth h-8 w-8 cursor-pointer select-none outline-none hover:scale-110 active:scale-90",
        "aria-label": "Save",
        children: /* @__PURE__ */ jsx("svg", {
          xmlns: "http://www.w4.org/2000/svg",
          viewBox: "0 0 448 512",
          className: "fill-stark",
          children: /* @__PURE__ */ jsx("path", {
            d: "M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
          })
        })
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "relative w-[80%]",
      children: open ? /* @__PURE__ */ jsx(Calendar, {
        events: [],
        month: 9
      }) : null
    })]
  });
};
__astro_tag_component__(DatePicker, "@astrojs/react");

const Right = ({
  rightOpen
}) => /* @__PURE__ */ jsxs("section", {
  className: ` ${rightOpen ? "w-1/2" : "w-0 translate-x-[100%]"} hover-fade relative flex h-full  flex-col  overflow-hidden rounded-bl-xl`,
  children: [/* @__PURE__ */ jsx("div", {
    className: "h-16 w-full p-3 ",
    children: /* @__PURE__ */ jsx(Title, {
      text: "Add/Edit Events"
    })
  }), /* @__PURE__ */ jsxs("div", {
    className: "relative flex  w-full flex-grow flex-col  items-center gap-2",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-md rounded-md bg-base py-2 px-8 text-center font-bold text-stark shadow-xl",
      children: "Season Start/End"
    }), /* @__PURE__ */ jsx(DatePicker, {}), /* @__PURE__ */ jsx(DatePicker, {}), /* @__PURE__ */ jsx("div", {
      className: "h-10"
    }), /* @__PURE__ */ jsx("h1", {
      className: "text-md rounded-md bg-base py-2 px-8 text-center font-bold text-stark shadow-xl",
      children: "Breaks/Holidays"
    }), /* @__PURE__ */ jsx(DatePicker, {})]
  })]
});
__astro_tag_component__(Right, "@astrojs/react");

const Rugby = () => {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const {
    events
  } = data.rugby;
  return /* @__PURE__ */ jsxs(Sport, {
    children: [/* @__PURE__ */ jsx(Left, {
      leftOpen,
      teams: data.rugby.teams
    }), /* @__PURE__ */ jsx(SideBtn, {
      setState: setLeftOpen,
      state: leftOpen,
      side: false
    }), /* @__PURE__ */ jsx(Middle, {
      title: "Rugby Schedule",
      events
    }), /* @__PURE__ */ jsx(SideBtn, {
      setState: setRightOpen,
      state: rightOpen,
      side: true
    }), /* @__PURE__ */ jsx(Right, {
      rightOpen
    })]
  });
};
__astro_tag_component__(Rugby, "@astrojs/react");

const Soccer = () => {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const {
    events
  } = data.soccer;
  return /* @__PURE__ */ jsxs(Sport, {
    children: [/* @__PURE__ */ jsx(Left, {
      leftOpen,
      teams: data.soccer.teams
    }), /* @__PURE__ */ jsx(SideBtn, {
      setState: setLeftOpen,
      state: leftOpen,
      side: false
    }), /* @__PURE__ */ jsx(Middle, {
      title: "Soccer Schedule",
      events
    }), /* @__PURE__ */ jsx(SideBtn, {
      setState: setRightOpen,
      state: rightOpen,
      side: true
    }), /* @__PURE__ */ jsx(Right, {
      rightOpen
    })]
  });
};
__astro_tag_component__(Soccer, "@astrojs/react");

const SportSelect = ({
  state,
  click,
  sport
}) => /* @__PURE__ */ jsx("button", {
  title: `${sport} page`,
  type: "button",
  onClick: click,
  className: ` ${state ? "bg-base" : "bg-mid"}  relative h-[2.5rem] w-[16rem] rounded-md ${sport === "Rugby" ? "origin-top-right rounded-bl-[1.5rem] shadow-2xl " : "origin-top-left rounded-br-[1.5rem] shadow-2xl"} select-none  duration-150 ease-in-out hover:scale-105 active:scale-95`,
  children: /* @__PURE__ */ jsx("h1", {
    className: `${state ? "text-stark" : "text-base"} absolute inset-0 m-auto inline-block h-fit w-fit text-lg font-bold`,
    children: sport
  })
});
__astro_tag_component__(SportSelect, "@astrojs/react");

const Compare = () => /* @__PURE__ */ jsxs(Sport, {
  children: [/* @__PURE__ */ jsx(Middle, {
    title: "Rugby Schedule",
    events: data.rugby.events
  }), /* @__PURE__ */ jsx(Middle, {
    title: "Soccer Schedule",
    events: data.soccer.events
  })]
});
__astro_tag_component__(Compare, "@astrojs/react");

const Main = () => {
  const [activePage, setActivePage] = useState([true, false, false]);
  const [rugbyActive, soccerActive, compareActive] = activePage;
  const setRugby = () => setActivePage([true, false, false]);
  const setSoccer = () => setActivePage([false, true, false]);
  const setCompare = () => setActivePage([false, false, true]);
  return /* @__PURE__ */ jsxs(Fragment$1, {
    children: [/* @__PURE__ */ jsx("a", {
      href: "/",
      children: /* @__PURE__ */ jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        className: "absolute top-2 right-2 h-6 w-6 fill-base hover:scale-125 active:scale-90",
        children: /* @__PURE__ */ jsx("path", {
          d: "M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
        })
      })
    }), /* @__PURE__ */ jsxs("nav", {
      className: "absolute inset-x-0 top-0 z-50 m-2 mx-auto box-border flex h-fit w-fit gap-2",
      children: [/* @__PURE__ */ jsx(SportSelect, {
        sport: "Rugby",
        state: rugbyActive,
        click: setRugby
      }), /* @__PURE__ */ jsx(SportSelect, {
        sport: "Soccer",
        state: soccerActive,
        click: setSoccer
      }), /* @__PURE__ */ jsx("button", {
        title: "Compare Schedules",
        onClick: setCompare,
        type: "button",
        className: `${compareActive ? "bg-base" : "bg-mid"} smooth absolute inset-x-0 top-4 mx-auto h-10 w-10 select-none rounded-full border-[0.3rem] border-top outline-none duration-100 ease-in-out hover:scale-110 active:scale-90`,
        children: /* @__PURE__ */ jsx("svg", {
          className: `inset-0 m-auto h-4 w-4 ${compareActive ? "fill-stark" : "fill-base"}`,
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 576 512",
          children: /* @__PURE__ */ jsx("path", {
            d: "M422.6 278.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 176H64c-17.7 0-32-14.3-32-32s14.3-32 32-32H434.7L377.4 54.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l112 112c12.5 12.5 12.5 32.8 0 45.3l-112 112zm-269.3 224l-112-112c-12.5-12.5-12.5-32.8 0-45.3l112-112c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L141.3 336H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H141.3l57.4 57.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z"
          })
        })
      })]
    }), rugbyActive ? /* @__PURE__ */ jsx(Rugby, {}) : null, soccerActive ? /* @__PURE__ */ jsx(Soccer, {}) : null, compareActive ? /* @__PURE__ */ jsx(Compare, {}) : null]
  });
};
__astro_tag_component__(Main, "@astrojs/react");

const MainPage = () => /* @__PURE__ */ jsx(App, {
  children: /* @__PURE__ */ jsx(Main, {})
});
__astro_tag_component__(MainPage, "@astrojs/react");

const $$Astro$1 = createAstro("C:/Users/105297006/Desktop/fieldScheduler/src/pages/main.astro", "", "file:///C:/Users/105297006/Desktop/fieldScheduler/");
const $$Main = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Main;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Scheduler" }, { "default": () => renderTemplate`${renderComponent($$result, "MainPage", MainPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/MainPage", "client:component-export": "default" })}` })}`;
});

const $$file$1 = "C:/Users/105297006/Desktop/fieldScheduler/src/pages/main.astro";
const $$url$1 = "/main";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Main,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const gif = "/assets/404.6751b389.gif";

const NotFound = () => /* @__PURE__ */ jsx(App, {
  children: /* @__PURE__ */ jsxs("div", {
    className: "absolute inset-0  m-auto grid h-fit w-fit place-content-center gap-4 p-2",
    children: [/* @__PURE__ */ jsx("p", {
      className: "text-center text-[3rem] font-bold text-red-700",
      children: "404 PAGE NOT FOUND"
    }), /* @__PURE__ */ jsx("img", {
      className: "rounded-md shadow-2xl",
      src: gif,
      alt: ""
    })]
  })
});
__astro_tag_component__(NotFound, "@astrojs/react");

const $$Astro = createAstro("C:/Users/105297006/Desktop/fieldScheduler/src/pages/404.astro", "", "file:///C:/Users/105297006/Desktop/fieldScheduler/");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login" }, { "default": () => renderTemplate`${renderComponent($$result, "NotFound", NotFound, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/NotFound", "client:component-export": "default" })}` })}`;
});

const $$file = "C:/Users/105297006/Desktop/fieldScheduler/src/pages/404.astro";
const $$url = "/404";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([['src/pages/index.astro', _page0],['src/pages/index/firebase.ts', _page1],['src/pages/index/auth.ts', _page2],['src/pages/main.astro', _page3],['src/pages/404.astro', _page4],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client.js","serverEntrypoint":"@astrojs/react/server.js","jsxImportSource":"react"}, { ssr: _renderer1 }),];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["assets/404.048f8d73.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/index/firebase","type":"endpoint","pattern":"^\\/index\\/firebase$","segments":[[{"content":"index","dynamic":false,"spread":false}],[{"content":"firebase","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/index/firebase.ts","pathname":"/index/firebase","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/index/auth","type":"endpoint","pattern":"^\\/index\\/auth$","segments":[[{"content":"index","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/index/auth.ts","pathname":"/index/auth","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/404.048f8d73.css"],"scripts":[],"routeData":{"route":"/main","type":"page","pattern":"^\\/main\\/?$","segments":[[{"content":"main","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/main.astro","pathname":"/main","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/404.048f8d73.css"],"scripts":[],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"extendDefaultPlugins":false,"isAstroFlavoredMd":false},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","@components/LoginPage":"LoginPage.961a2ea4.js","@components/MainPage":"MainPage.2f97bfc3.js","@components/NotFound":"NotFound.5cf35b83.js","@astrojs/react/client.js":"client.79c72615.js","astro:scripts/before-hydration.js":""},"assets":["/assets/sun.669111f8.svg","/assets/moon.b0940a74.svg","/assets/404.6751b389.gif","/assets/caret.4f81ff0d.svg","/assets/arrow.325f8566.svg","/assets/year.3b4897dd.svg","/assets/calendar.70bc5c69.svg","/assets/day.fb7b8a51.svg","/assets/week.cc1d95ef.svg","/assets/404.048f8d73.css","/client.79c72615.js","/LoginPage.961a2ea4.js","/MainPage.2f97bfc3.js","/NotFound.5cf35b83.js","/chunks/App.392614d3.js","/chunks/index.4a1d0641.js"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler };
