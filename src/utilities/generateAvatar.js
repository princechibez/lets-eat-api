// @_learnable
const avatarStyles = [
    'adventurer',
    'adventurer-neutral',
    'avataaars',
    'avataaars-neutral',
    'big-ears',
    'big-ears-neutral',
    'big-smile',
    'bottts',
    'bottts-neutral',
    'croodles',
    'croodles-neutral',
    'fun-emoji',
    'icons',
    'identicon',
    'initials',
    'lorelei',
    'lorelei-neutral',
    'micah',
    'miniavs',
    'open-peeps',
    'personas',
    'pixel-art',
    'pixel-art-neutral',
    'shapes',
    'thumbs'
];


const getRandomAvatarStyle = () => {
    // Your code here
    return avatarStyles[Math.floor(Math.random() * avatarStyles.length - 1)]
}


const generateRandomAvatar = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const _email = email.trim();

    const isValidEmail = emailRegex.test(_email);
    if (!isValidEmail) {
        throw new Error('Invalid email')
    }

    const entropySource = () => Math.random().toString(36).substring(2, 7);

    const replaceAt = `-${entropySource()}-`
    const replaceDot = `-${entropySource()}-`

    const seed = _email.replace('@', replaceAt).replace('.', replaceDot);

    const randomAvatarStyle = getRandomAvatarStyle();

    if (!randomAvatarStyle || !avatarStyles.includes(randomAvatarStyle)) {
        throw Error('Invalid avatar style') // log this error to the console
    }

    const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;

    return avatarUrl
}
// @_learnable

module.exports = generateRandomAvatar;
