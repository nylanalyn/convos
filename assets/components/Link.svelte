<script>
import {route} from '../store/Route';

let className = '';
let el;

export {className as class};
export let href = '/';
export let style = '';
export let replace = false;

export const focus = () => el.focus();

$: absoluteHref = href.indexOf('/') === 0 ? $route.basePath + href : href;
$: hasPath = $route.basePath + $route.path === absoluteHref.replace(/(#|\?).*/, '');

function onClick(event) {
  if (!route.enabled) return;
  if (event.defaultPrevented) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  if (href.indexOf('/') !== 0) return;
  event.preventDefault();
  route.go(href, {replace});
}
</script>

<a href="{absoluteHref}" class="{className}" class:has-path="{hasPath}" style="{style}" bind:this="{el}" on:click="{onClick}"><slot/></a>
