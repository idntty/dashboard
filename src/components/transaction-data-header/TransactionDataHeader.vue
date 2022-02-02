<template>
  <div>
    <!-- identityAsset -->
    <div v-if="transactionType==='identityAsset'" >
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <h3>Identity</h3>
        </div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>General</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            {{shortString(transaction.asset.general)}}
          </el-col>
        </el-row>
        <div class="spacer"></div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>Nationality</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            {{shortString(transaction.asset.nationality)}}
          </el-col>
        </el-row>
      </el-card>
      <div class="spacer2x"></div>
    </div>

    <!-- validationAsset -->
    <div v-if="transactionType==='validationAsset'" >
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <h3>Validate account</h3>
        </div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>Account</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            {{shortString(getAccountFromKey(transaction.senderPublicKey))}}
          </el-col>
        </el-row>
        <div class="spacer"></div>
        <div class="hr"></div>
        <div class="spacer"></div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>General</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            {{shortString(transaction.asset.identity.general)}}
          </el-col>
        </el-row>
        <div class="spacer"></div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>Nationality</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            {{shortString(transaction.asset.identity.nationality)}}
          </el-col>
        </el-row>
      </el-card>
      <div class="spacer2x"></div>
    </div>

    <!-- invalidationAsset -->
    <div v-if="transactionType==='invalidationAsset'">
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <h3>Invalidate account</h3>
        </div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>Account</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            {{shortString(getAccountFromKey(transaction.senderPublicKey))}}
          </el-col>
        </el-row>
        <div class="spacer"></div>
        <div class="hr"></div>
        <div class="spacer"></div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>General</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            {{shortString(transaction.asset.identity.general)}}
          </el-col>
        </el-row>
        <div class="spacer"></div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>Nationality</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            {{shortString(transaction.asset.identity.nationality)}}
          </el-col>
        </el-row>
      </el-card>
      <div class="spacer2x"></div>
    </div>

    <!-- authorityAsset -->
    <div v-if="transactionType==='authorityAsset'">
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <h3>Authority</h3>
        </div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>Name</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            ** SOME NAME **
          </el-col>
        </el-row>
        <div class="spacer"></div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>Description</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            ** SOME DESCRIPTION **
          </el-col>
        </el-row>
      </el-card>
      <div class="spacer2x"></div>
    </div>

    <!-- delegationAsset -->
    <div v-if="transactionType==='delegationAsset'">
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <h3>Account delegation</h3>
        </div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>Account</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            ** SOME ACCOUNT NUMBER **
          </el-col>
        </el-row>
      </el-card>
      <div class="spacer2x"></div>
    </div>

    <!-- undelegationAsset -->
    <div v-if="transactionType==='undelegationAsset'">
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <h3>Account undelegation</h3>
        </div>
        <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
          <el-col :md="4" :xs="12">
            <h4>Account</h4>
          </el-col>
          <el-col :md="20" :xs="12">
            ** SOME ACCOUNT NUMBER **
          </el-col>
        </el-row>
      </el-card>
      <div class="spacer2x"></div>
    </div>

    <!-- signatureAsset -->
    <div v-if="transactionType==='signatureAsset'">
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <h3>Package details</h3>
        </div>
        <div>
          <el-table
            :data="transaction.asset.package">
            <div slot="empty">
              NO DATA
            </div>
            <el-table-column
              width="300"
              prop="document"
              label="Document">
              <template slot-scope="scope">
                {{shortString(scope.row.document)}}
              </template>
            </el-table-column>
            <el-table-column
              width="300"
              prop="signatures"
              label="Signatures">
              <template slot-scope="scope">
                  <div v-for="(i, index) in scope.row.signatures" :key="index">
                    {{shortString(i.signature)}}
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              width="300"
              prop="signatures"
              label="Public Key">
              <template slot-scope="scope">
                  <div v-for="(i, index) in scope.row.signatures" :key="index">
                    {{shortString(i.publicKey)}}
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              width="300"
              prop="signatures"
              label="Algorithm">
              <template slot-scope="scope">
                  <div v-for="(i, index) in scope.row.signatures" :key="index">
                    {{i.algorithm || '-'}}
                  </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="spacer2x"></div>

        <div>
          <h4>Participants</h4>
          <div class="spacer"></div>

          <el-row
            v-for="(participant, index) in transaction.asset.participants"
            :key="index"
            :gutter="20">
            <el-col>
              <router-link
                class="el-link el-link--primary"
                :to="{name: 'account', params: { id: participant }}">
                {{shortString(participant)}}
              </router-link>
              <div class="spacer"></div>
            </el-col>
          </el-row>
        </div>
        <div class="spacer"></div>
        <div class="hr"/>
        <div class="spacer2x"></div>

        <h4>Comments</h4>
        <div class="spacer"></div>
        {{transaction.asset.comments}}
        <div class="spacer"></div>
      </el-card>
      <div class="spacer2x"></div>
    </div>

  </div>
</template>
<script>
import { shortString, getAccountFromKey } from '@/modules/short-string.js'
export default {
  name: 'TransactionDataHeader',
  props: {
    transaction: {
      type: Object,
      required: true
    },
    transactionType: {
      type: String,
      required: true
    }
  },
  methods: {
    shortString,
    getAccountFromKey
  }
}
</script>
