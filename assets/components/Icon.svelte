<script context="module">
const familyToClassName = {brand: 'fab', regular: 'far', solid: 'fas'};

const contributorIcons = {
  batman: 'https://www.gravatar.com/avatar/ab1839667863f31e359d98364cfdef61',
  marcusr: 'https://www.gravatar.com/avatar/6c056546d802b1a9ac186ab63f9fb632',
};

</script>

<script>
import {avatarClassForKey} from '../js/avatars';

let className = '';

export {className as class};
export let animation = '';
export let color = '';
export let family = '';
export let name;
export let avatarId;

function calculateClassName(name, family, animation, explicitAvatarId) {
  const cn = [];
  const pick = name.match(/^pick:(.+)$/);

  if (pick) {
    if (pick[1] === 'Convos') return 'fas fa-info-circle'; // Uppercase "C" is not a typo
    if (contributorIcons[pick[1]]) return 'fas fa-contributor for-' + pick[1].toLowerCase();
    cn.push(avatarClassForKey(pick[1], explicitAvatarId));
  }
  else {
    cn.push(familyToClassName[family] || 'fas');
    cn.push('fa-' + name);
  }

  if (animation) cn.push(animation.split(' ').map(a => 'fa-' + a));
  if (className) cn.push(className.split(' '));

  return cn.join(' ');
}

function calculateStyle(name, color) {
  const rules = [];
  let colorRuleName = 'color:';

  const pick = name.match(/^pick:(.+)$/);
  if (pick && contributorIcons[pick[1]]) {
    colorRuleName = 'background-color:';
    rules.push('background-image:url("' + contributorIcons[pick[1]] + '")');
  }

  if (color) {
    rules.push(colorRuleName + color);
  }

  return rules.join(';');
}
</script>

<i class="{calculateClassName(name, family, animation, avatarId)}" style="{calculateStyle(name, color)}" hidden="{!name}"/>
