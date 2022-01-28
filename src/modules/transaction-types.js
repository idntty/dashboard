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

export const transactionTypesIcons = {
  identityAsset: 'icon-identityAsset',
  validationAsset: 'icon-validationAsset',
  invalidationAsset: 'icon-invalidationAsset',
  authorityAsset: 'icon-authorityAsset',
  delegationAsset: 'icon-delegationAsset',
  undelegationAsset: 'icon-undelegationAsset',
  signatureAsset: 'icon-signatureAsset',
  unknownAsset: 'icon-unknownAsset'
}
