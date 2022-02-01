export function defineTransactionType (moduleId, assetId) {
   switch (`mid${moduleId}_aid${assetId}`) {
     case 'mid1001_aid1':
       return 'identityAsset'
     case 'mid1001_aid2':
       return 'validationAsset'
     case 'mid1001_aid3':
       return 'invalidationAsset'
     case 'mid1002_aid1':
       return 'authorityAsset'
     case 'mid1002_aid2':
       return 'delegationAsset'
     case 'mid1003_aid3':
       return 'undelegationAsset'
     case 'mid1010_aid1':
       return 'signatureAsset'
     default:
       return 'unknownAsset'
   }

}

const BASE_ICON_PATH = '/img/assetIcons/'
export const transactionTypesIcons = {
  identityAsset: `${BASE_ICON_PATH}identityAsset.png`,
  validationAsset: `${BASE_ICON_PATH}validationAsset.png`,
  invalidationAsset: `${BASE_ICON_PATH}invalidationAsset.png`,
  authorityAsset: `${BASE_ICON_PATH}authorityAsset.png`,
  delegationAsset: `${BASE_ICON_PATH}delegationAsset.png`,
  undelegationAsset: `${BASE_ICON_PATH}undelegationAsset.png`,
  signatureAsset: `${BASE_ICON_PATH}signatureAsset.png`,
  unknownAsset: `${BASE_ICON_PATH}unknownAsset.png`,
}
