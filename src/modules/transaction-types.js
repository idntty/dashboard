export function defineTransactionType (moduleId, assetId) {
   switch (`mid${moduleId}_aid${assetId}`) {
    case 'mid1001_aid1': return 'setFeature'
    case 'mid1001_aid2': return 'removeFeature'
    case 'mid1001_aid11': return 'validateFeature'
    case 'mid1001_aid12': return 'invalidateFeature'

    case 'mid1002_aid1': return 'setAuthority'
    case 'mid1002_aid2': return 'delegateAuthority'
    case 'mid1003_aid3': return 'undelegateAuthority'

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
  proceed: 'Proceed',
  unknown: 'Unknown'
}
export const transactionColorByType = {
  setFeature: 'purple-600',
  removeFeature: 'red-600',
  validateFeature: 'green-400',
  invalidateFeature: 'red-600',
  setAuthority: 'blue-500',
  delegateAuthority: 'blue-500',
  undelegateAuthority: 'blue-500',
  proceed: 'blue-500',
  unknown: 'blue-500'
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
