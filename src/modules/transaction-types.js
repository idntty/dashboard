export function defineTransactionType (moduleId, assetId) {
   switch (`mid${moduleId}_aid${assetId}`) {
    case 'mid1001_aid1': return 'setFeature'
    case 'mid1001_aid2': return 'removeFeature'
    case 'mid1001_aid11': return 'validateFeature'
    case 'mid1001_aid12': return 'invalidateFeature'

    case 'mid1002_aid1': return 'setAuthority'
    case 'mid1002_aid2': return 'delegateAuthority'
    case 'mid1003_aid3': return 'undelegateAuthority'

    case 'mid2_aid0': return 'transfer'

    case 'mid1010_aid1': return 'proceed'
    default:
      return 'unknown'
   }

}

export const transactionNameByType = {
  setFeature: 'Set Feature',
  removeFeature: 'Remove Feature',
  validateFeature: 'Validate Feature',
  invalidateFeature: 'Invalidate Feature',
  setAuthority: 'Set Authority',
  delegateAuthority: 'Delegate Authority',
  undelegateAuthority: 'Undelegate Authority',
  transfer: 'Transfer',
  proceed: 'Proceed',
  unknown: 'Unknown'
}
export const transactionColorByType = {
  setFeature: {bg: 'bg-purple-600', border: 'border-purple-600'},
  removeFeature: {bg: 'bg-red-600', border: 'border-red-600'},
  validateFeature: {bg: 'bg-green-600', border: 'border-green-400'},
  invalidateFeature: {bg: 'bg-red-600', border: 'border-red-600'},
  setAuthority: {bg: 'bg-blue-500', border: 'border-blue-500'},
  delegateAuthority: {bg: 'bg-blue-500', border: 'border-blue-500'},
  undelegateAuthority: {bg: 'bg-blue-500', border: 'border-blue-500'},
  transfer: {bg: 'bg-teal-500', border: 'border-teal-500'},
  proceed: {bg: 'bg-blue-500', border: 'border-blue-500'},
  unknown: {bg: 'bg-blue-500', border: 'border-blue-500'}
}


// const BASE_ICON_PATH = '/img/assetIcons/'
// export const transactionTypesIcons = {
//   identityAsset: `${BASE_ICON_PATH}identityAsset.png`,
//   validationAsset: `${BASE_ICON_PATH}validationAsset.png`,
//   invalidationAsset: `${BASE_ICON_PATH}invalidationAsset.png`,
//   authorityAsset: `${BASE_ICON_PATH}authorityAsset.png`,
//   delegationAsset: `${BASE_ICON_PATH}delegationAsset.png`,
//   undelegationAsset: `${BASE_ICON_PATH}undelegationAsset.png`,
//   signatureAsset: `${BASE_ICON_PATH}signatureAsset.png`,
//   unknownAsset: `${BASE_ICON_PATH}unknownAsset.png`,
// }
