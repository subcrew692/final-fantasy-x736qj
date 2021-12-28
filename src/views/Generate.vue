<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <div class="q-pa-md" style="max-width: 500px">
        <div class="q-gutter-md">
          <q-input color="teal" outlined v-model="tag" label="Tag" :rules="tagRules">
            <template v-slot:append>
              <q-avatar>
                <i class="fas fa-adjust"></i>
              </q-avatar>
            </template>
          </q-input>

          <q-checkbox v-model="forward" label="Forward" color="cyan" />
          <q-checkbox v-model="merchant" label="Merchant" color="cyan" />
          <q-checkbox v-model="tcForward" label="Tc-Forward" color="cyan" />

          <div v-if="merchant">
            <q-checkbox v-model="merchants.kto" label="KTO" color="cyan" />
            <q-checkbox v-model="merchants.wb" label="WB" color="cyan" />
            <q-checkbox v-model="merchants.dc" label="DC" color="cyan" />
            <q-checkbox v-model="merchants.tc" label="TC" color="cyan" />
          </div>

          <div class="row">
            <div class="col-8">
              <q-radio name="deployEnv" v-model="deployEnv" val="stg" label="STG" />
              <q-radio name="deployEnv" v-model="deployEnv" val="prd" label="PRD" />
            </div>
            <div class="col-4">
              <q-btn color="primary" icon="settings" label="Generate" type="submit" />
            </div>
          </div>
        </div>
      </div>
    </q-form>
    <div class="q-pa-md">
      <q-layout view="lHh lpr lFf" container style="height: 125px; margin-bottom: 15px" class="shadow-2 rounded-borders" v-for="(d, index) in deployScripts" :key="index">
        <q-header elevated>
          <q-toolbar class="glossy">
            <q-toolbar-title>{{ d.type }}</q-toolbar-title>
            <q-btn flat round dense :icon="d.icon" @click="copyScript(d)" :disable="d.icon === 'check'" />
          </q-toolbar>
        </q-header>
        <q-page-container>
          <q-page class="q-pa-md">
            <p>{{ d.script }}</p>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue';

interface IMerchants {
  kto: boolean;
  wb: boolean;
  dc: boolean;
  tc: boolean;
}

interface IExtraVars {
  env: string;
  type: string;
  target: string;
  host: string;
  tag: string;
  id?: number;
}

interface IDeployScript {
  type: string;
  script: string;
  icon: string;
}

function getHostName(host: string) {
  return host === 'stg' ? 'Stg' : 'Prod';
}

function generateScript(extraVars: IExtraVars): string {
  const deployEnv = `deployEnv=${extraVars.env}`;
  const nginxType = `nginxType=${extraVars.type}`;
  const targetClient = `targetClient=${extraVars.target}`;
  const host = `host=${extraVars.host}`;
  const hostName = `hostName=${getHostName(extraVars.host)}`;
  const tag = `tag=${extraVars.tag}`;
  const merchantId = extraVars.id ? ` merchantId=${extraVars.id}` : '';
  return `ansible-playbook /data-disk/deploy/ansible/nginx/deploy-nginx.yml --extra-vars 'user=nginxadmin ${deployEnv} ${nginxType} ${targetClient} ${hostName} ${host} ${tag}${merchantId}'`;
}

function generateTcForward(env: string, target: string, host: string, tag: string): string {
  const deployEnv = `deployEnv=${env}`;
  const targetClient = `targetClient=${target}`;
  const hostValue = `host=${host}`;
  const tagValue = `tag=${tag}`;
  return `ansible-playbook /data-disk/deploy/ansible/nginx/deploy-release-tc-forward.yml --extra-vars 'user=dkadmin ${deployEnv} ${targetClient} ${hostValue} ${tagValue}`;
}

export default defineComponent({
  name: 'Generate',
  setup() {
    const tag = ref('nginx__release__sprint_2111_2__20211220__1');
    const tagRules = [(val) => !!val || 'Tag is required'];
    const forward = ref(false);
    const merchant = ref(false);
    const tcForward = ref(false);
    const merchants: IMerchants = reactive({
      kto: false,
      wb: false,
      dc: false,
      tc: false,
    });
    const deployEnv = ref('stg');
    const deployScripts: Ref<IDeployScript[]> = ref([]);
    const copyIcon = ref('content_copy');

    const onSubmit = () => {
      if (!deployEnv.value) {
        return;
      }
      deployScripts.value = [];
      forward.value &&
        deployScripts.value.push({
          type: 'Forward',
          script: generateScript({
            env: deployEnv.value,
            type: 'forward',
            target: 'forward-nginx',
            host: 'SbkForwardNginx',
            tag: tag.value,
          }),
          icon: 'content_copy',
        });
      if (merchant.value) {
        merchants.kto &&
          deployScripts.value.push({
            type: 'Merchant-KTO',
            script: generateScript({
              env: deployEnv.value,
              type: 'client',
              target: 'merchant-nginx',
              host: 'MerchantKtoNginx',
              tag: tag.value,
              id: 1,
            }),
            icon: 'content_copy',
          });
        merchants.wb &&
          deployScripts.value.push({
            type: 'Merchant-WB',
            script: generateScript({
              env: deployEnv.value,
              type: 'client',
              target: 'merchant-nginx',
              host: 'MerchantWbNginx',
              tag: tag.value,
              id: 2,
            }),
            icon: 'content_copy',
          });
        merchants.dc &&
          deployScripts.value.push({
            type: 'Merchant-DC',
            script: generateScript({
              env: deployEnv.value,
              type: 'client',
              target: 'merchant-nginx',
              host: 'MerchantDcNginx',
              tag: tag.value,
              id: 901,
            }),
            icon: 'content_copy',
          });
        merchants.tc &&
          deployScripts.value.push({
            type: 'Merchant-TC',
            script: generateScript({
              env: deployEnv.value,
              type: 'client',
              target: 'merchant-nginx',
              host: 'MerchantTcNginx',
              tag: tag.value,
              id: 999,
            }),
            icon: 'content_copy',
          });
      }
      tcForward.value &&
        deployScripts.value.push({
          type: 'TC-Forward',
          script: generateTcForward(deployEnv.value, 'tc-forward', 'ext-tc-docker-host', tag.value),
          icon: 'content_copy',
        });
    };

    const copyScript = (deployScript: IDeployScript) => {
      navigator.clipboard.writeText(deployScript.script);
      deployScript.icon = 'check';
      setTimeout(() => {
        deployScript.icon = 'content_copy';
      }, 1000);
    };

    return {
      tag,
      tagRules,
      forward,
      merchant,
      tcForward,
      merchants,
      deployEnv,
      copyIcon,
      onSubmit,
      copyScript,
      deployScripts,
    };
  },
});
</script>
