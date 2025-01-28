<template>
  <div class="q-pa-xs q-gutter-sm bg-lime-2">
    <q-card flat class="bg-lime-1" style="border-radius: 20px">
      <q-splitter
        v-model="splitterModel"
        unit="px"
        style="height: calc(100vh - 56px)"
        :limits="[280, 280]"
      >
        <template v-slot:before>
          <div
            class="q-pa-md text-white bg-teal q-mt-sm"
            style="width: 280px; border-radius: 20px 0px 0px 20px"
          >
            <div class="row items-center justify-between q-mb">
              <div class="text-h5 text-weight-medium">Filtros</div>
            </div>
            <q-separator color="teal-1" />
            <!-- Filtro por Entidad -->
            <div class="q-pt-sm text-subtitle1 text-weight-medium">
              Entidad:
            </div>
            <div class="q-pr-sm q-pb-sm">
              <q-toggle
                color="primary"
                label="Registros Colmed"
                v-model="selectedEntidad"
                val="colmed"
                @update:model-value="filterData"
                :disable="initFilter"
              />
              <q-toggle
                color="primary"
                label="Registros Servicio de Salud"
                v-model="selectedEntidad"
                val="no_colegiado"
                @update:model-value="filterData"
                :disable="initFilter"
              />
            </div>

            <!-- Filtro por Estado de Pago (multiple) -->
            <q-separator />
            <div class="text-subtitle1 text-weight-medium">Estado de pago:</div>

            <div class="q-pr-sm q-pb-sm">
              <q-toggle
                v-for="estado in estadosVisibles()"
                :key="estado.value"
                color="primary"
                :label="estado.label"
                v-model="selectedEstadosPago"
                :val="estado.value"
                :disable="initFilter"
                @update:model-value="filterData"
              />
            </div>
            <q-expansion-item
              dense
              class="q-pb-sm bg-teal-5"
              expand-separator
              label="Otros estados de pago"
              expand-icon-class="text-white"
            >
              <q-toggle
                v-for="estado in estadosOcultos()"
                :key="estado.value"
                color="primary"
                :label="estado.label"
                v-model="selectedEstadosPago"
                :val="estado.value"
                :disable="initFilter"
                @update:model-value="filterData"
              />
            </q-expansion-item>
            <q-separator spaced />

            <div class="text-subtitle1 text-weight-medium">
              Fecha de nacimiento:
            </div>
            <q-card flat class="bg-teal">
              <div class="q-gutter-xs">
                <q-btn
                  icon="event"
                  rounded
                  color="white"
                  flat
                  no-caps
                  label="Desde"
                  style="width: 110px"
                  class="q-pl-sm"
                  :disable="initFilter"
                >
                  <q-popup-proxy
                    @before-show="updateProxyStartBirthdate"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="startDateBirthdate">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          @click="cancelStartDateBirthdate"
                          color="primary"
                          flat
                          v-close-popup
                        />
                        <q-btn
                          label="OK"
                          color="primary"
                          flat
                          v-close-popup
                          @click="saveBirthdate"
                        />
                        <!-- @click="save"  -->
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
                <q-btn
                  icon="event"
                  rounded
                  flat
                  color="white"
                  no-caps
                  label="Hasta"
                  style="width: 110px"
                  class="q-ml-lg"
                  :disable="initFilter"
                >
                  <q-popup-proxy
                    @before-show="updateProxyEndBirthdate"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="endDateBirthdate">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          @click="cancelEndDateBirthdate"
                          color="primary"
                          flat
                          v-close-popup
                        />
                        <q-btn
                          label="OK"
                          color="primary"
                          flat
                          v-close-popup
                          @click="saveBirthdate"
                        />
                        <!-- @click="save"  -->
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
              </div>
              <div class="q-pa-xs q-gutter-xs">
                <q-breadcrumbs class="text-grey-14" align="center">
                  <template v-slot:separator>
                    <q-icon size="1.2em" name="arrow_forward" color="white" />
                  </template>
                  <q-breadcrumbs-el
                    class="text-white"
                    :label="
                      startDateBirthdate ? formatDate(startDateBirthdate) : ''
                    "
                    :icon="startDateBirthdate ? 'close' : ''"
                    :disable="initFilter"
                    @click="cancelStartDateBirthdate"
                  />
                  <q-breadcrumbs-el
                    class="text-white"
                    :label="
                      endDateBirthdate ? formatDate(endDateBirthdate) : ''
                    "
                    :icon="endDateBirthdate ? 'close' : ''"
                    :disable="initFilter"
                    @click="cancelEndDateBirthdate"
                  />
                </q-breadcrumbs>
              </div>
              <div
                v-if="errorEndDateBirth.valor"
                class="text-negative text-caption bg-white"
              >
                {{ errorEndDateBirth.mensaje }}
              </div>
              <div
                v-if="errorStartDateBirth.valor"
                class="text-negative text-overline bg-teal-1"
              >
                {{ errorStartDateBirth.mensaje }}
              </div>
            </q-card>

            <q-separator spaced />

            <!-- <div class="row q-gutter-md q-mb-md">
              <div class="col">
                <q-input
                  dense
                  label="Desde"
                  v-model="startDateBirthdate"
                  mask="##-##-####"
                  @update:modelValue="onStartDateBirthChange"
                  bottom-slots
                  :error="!errorStartDateBirth.valor"
                >
                  <template v-slot:error>
                    {{ errorStartDateBirth.mensaje }}
                  </template>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="startDateBirthdate"
                          mask="DD-MM-YYYY"
                          @update:modelValue="onStartDateBirthChange"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Ok"
                              color="primary"
                              flat
                              @click="filterData"
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col">
                <q-input
                  dense
                  label="Hasta"
                  v-model="endDateBirthdate"
                  mask="##-##-####"
                  @update:modelValue="onEndDateBirthChange"
                  bottom-slots
                  :error="!errorEndDateBirth.valor"
                >
                  <template v-slot:error>
                    {{ errorEndDateBirth.mensaje }}
                  </template>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="endDateBirthdate"
                          @update:modelValue="onEndDateBirthChange"
                          mask="DD-MM-YYYY"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Ok"
                              color="primary"
                              flat
                              @click="filterData"
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div> -->
            <div class="text-subtitle1 text-weight-medium">
              Fecha de título:
            </div>
            <q-card flat class="bg-teal">
              <div class="q-gutter-xs">
                <q-btn
                  icon="event"
                  rounded
                  color="white"
                  flat
                  no-caps
                  label="Desde"
                  style="width: 110px"
                  class="q-pl-sm"
                  :disable="initFilter"
                >
                  <q-popup-proxy
                    @before-show="updateProxyStartTitledate"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="startDateTitle">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          @click="cancelStartDateTitle"
                          color="primary"
                          flat
                          v-close-popup
                        />
                        <q-btn
                          label="OK"
                          color="primary"
                          flat
                          v-close-popup
                          @click="saveTitledate"
                        />
                        <!-- @click="save"  -->
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
                <q-btn
                  icon="event"
                  rounded
                  flat
                  color="white"
                  no-caps
                  label="Hasta"
                  style="width: 110px"
                  class="q-ml-lg"
                  :disable="initFilter"
                >
                  <q-popup-proxy
                    @before-show="updateProxyEndTitledate"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="endDateTitle">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          @click="cancelEndDateTitle"
                          color="primary"
                          flat
                          v-close-popup
                        />
                        <q-btn
                          label="OK"
                          color="primary"
                          flat
                          v-close-popup
                          @click="saveTitledate"
                        />
                        <!-- @click="save"  -->
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
              </div>
              <div class="q-pa-xs q-gutter-xs">
                <q-breadcrumbs class="text-grey-14" align="center">
                  <template v-slot:separator>
                    <q-icon size="1.2em" name="arrow_forward" color="white" />
                  </template>
                  <q-breadcrumbs-el
                    class="text-white"
                    :label="startDateTitle ? formatDate(startDateTitle) : ''"
                    :icon="startDateTitle ? 'close' : ''"
                    :disable="initFilter"
                    @click="cancelStartDateTitle"
                  />
                  <q-breadcrumbs-el
                    class="text-white"
                    :label="endDateTitle ? formatDate(endDateTitle) : ''"
                    :icon="endDateTitle ? 'close' : ''"
                    :disable="initFilter"
                    @click="cancelEndDateTitle"
                  />
                </q-breadcrumbs>
              </div>
              <div
                v-if="errorStartDateTitle.valor"
                class="text-negative text-overline bg-teal-1"
              >
                {{ errorStartDateTitle.mensaje }}
              </div>
              <div
                v-if="errorEndDateTitle.valor"
                class="text-negative text-overline bg-teal-1"
              >
                {{ errorEndDateTitle.mensaje }}
              </div>
            </q-card>
            <q-separator spaced />
            <div class="text-subtitle1 text-weight-medium">
              Fecha de inscripción Colmed:
            </div>
            <q-card flat class="bg-teal">
              <div class="q-gutter-xs">
                <q-btn
                  icon="event"
                  rounded
                  color="white"
                  flat
                  no-caps
                  label="Desde"
                  style="width: 110px"
                  class="q-pl-sm"
                  :disable="initFilter"
                >
                  <q-popup-proxy
                    @before-show="updateProxyStartInscriptiondate"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="startDateInscription">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          @click="cancelStartDateInscription"
                          color="primary"
                          flat
                          v-close-popup
                        />
                        <q-btn
                          label="OK"
                          color="primary"
                          flat
                          v-close-popup
                          @click="saveInscriptiondate"
                        />
                        <!-- @click="save"  -->
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
                <q-btn
                  icon="event"
                  rounded
                  flat
                  color="white"
                  no-caps
                  label="Hasta"
                  style="width: 110px"
                  class="q-ml-lg"
                  :disable="initFilter"
                >
                  <q-popup-proxy
                    @before-show="updateProxyEndInscriptiondate"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="endDateInscription">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          @click="cancelEndDateInscription"
                          color="primary"
                          flat
                          v-close-popup
                        />
                        <q-btn
                          label="OK"
                          color="primary"
                          flat
                          v-close-popup
                          @click="saveInscriptiondate"
                        />
                        <!-- @click="save"  -->
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
              </div>
              <div class="q-pa-xs q-gutter-xs">
                <q-breadcrumbs class="text-white" align="center">
                  <template v-slot:separator>
                    <q-icon size="1.2em" name="arrow_forward" color="white" />
                  </template>
                  <q-breadcrumbs-el
                    class="text-white"
                    :label="
                      startDateInscription
                        ? formatDate(startDateInscription)
                        : ''
                    "
                    :icon="startDateInscription ? 'close' : ''"
                    :disable="initFilter"
                    @click="cancelStartDateInscription"
                  />
                  <q-breadcrumbs-el
                    class="text-white"
                    :label="
                      endDateInscription ? formatDate(endDateInscription) : ''
                    "
                    :icon="endDateInscription ? 'close' : ''"
                    :disable="initFilter"
                    @click="cancelEndDateInscription"
                  />
                </q-breadcrumbs>
              </div>
              <div
                v-if="errorEndDateInscription.valor"
                class="text-negative text-overline bg-teal-1"
              >
                {{ errorEndDateInscription.mensaje }}
              </div>
              <div
                v-if="errorStartDateInscription.valor"
                class="text-negative text-overline bg-teal-1"
              >
                {{ errorStartDateInscription.mensaje }}
              </div>
            </q-card>
            <!-- <div class="row q-gutter-md q-mb-md">
              <div class="col">
                <q-input
                  dense
                  label="Desde"
                  v-model="startDateTitle"
                  mask="##-##-####"
                  @update:modelValue="onStartDateTitleChange"
                  bottom-slots
                  :error="!errorStartDateTitle.valor"
                >
                  <template v-slot:error>
                    {{ errorStartDateTitle.mensaje }}
                  </template>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="startDateTitle"
                          @update:modelValue="onStartDateTitleChange"
                          mask="DD-MM-YYYY"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Ok"
                              color="primary"
                              flat
                              @click="filterData"
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col">
                <q-input
                  dense
                  label="Hasta"
                  v-model="endDateTitle"
                  mask="##-##-####"
                  @update:modelValue="onEndDateTitleChange"
                  bottom-slots
                  :error="!errorEndDateTitle.valor"
                >
                  <template v-slot:error>
                    {{ errorEndDateTitle.mensaje }}
                  </template>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="endDateTitle"
                          mask="DD-MM-YYYY"
                          @update:modelValue="onEndDateTitleChange"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Ok"
                              color="primary"
                              flat
                              @click="filterData"
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div> -->
            <!-- <div class="row items-center justify-between q-mb">
              <div class="text-h6">Filtros Registro Superintendencia</div>
            </div>
            <q-separator spaced />
            <div class="text-subtitle1">Especialidad:</div>
            <q-select
              v-model="selectedEstadosPago"
              :options="estadoPagoOptions"
              outlined
              dense
              use-chips
              multiple
              class="q-mb-md"
              :disable="
                !(selectedEntidad && selectedEntidad.value === 'Colmed')
              "
              option-value="value"
              option-label="label"
              @update:model-value="onEstadosPagoChange"
            />
            <div class="text-subtitle1">Orden profesional:</div>
            <q-select
              v-model="selectedEstadosPago"
              :options="estadoPagoOptions"
              outlined
              dense
              use-chips
              multiple
              class="q-mb-md"
              :disable="
                !(selectedEntidad && selectedEntidad.value === 'Colmed')
              "
              option-value="value"
              option-label="label"
              @update:model-value="onEstadosPagoChange"
            /> -->
            <q-separator spaced />
            <div class="row justify-end">
              <q-btn
                rounded
                v-if="
                  selectedEntidad.length ||
                  selectedEstadosPago.length ||
                  startDateBirthdate ||
                  startDateTitle ||
                  endDateBirthdate ||
                  endDateTitle ||
                  startDateInscription ||
                  endDateInscription
                "
                class="q-ml-sm"
                color="light-blue-10"
                label="Limpiar filtros"
                no-caps
                @click="clearFilter"
              />
            </div>
          </div>
        </template>

        <template v-slot:after>
          <q-inner-loading :showing="!loading">
            <div class="text-overline">Cargando datos...</div>
            <q-spinner-dots color="primary" size="2em"
          /></q-inner-loading>
          <div class="q-pa-sm" v-if="loading">
            <q-table
              :rows="medicosFiltrados ? medicosFiltrados : medicos"
              :columns="columns"
              row-key="rut"
              :filter="filter"
              v-model:pagination="pagination"
              :rows-per-page-options="[6, 18, 60]"
              :grid="gridMode"
              :card-class="gridMode ? '' : 'bg-lime-1 text-dark'"
              :visible-columns="
                gridMode ? columnasVisiblesGridMod : columnasVisiblesNotGridMod
              "
              class="my-sticky-virtscroll-table"
            >
              <template v-slot:top>
                <q-card flat style="width: 100%" class="bg-lime-1">
                  <div class="text-primary q-ml-md">
                    <div class="text-h5 text-weight-medium">
                      Listado de médicos
                    </div>
                    <q-separator />
                    <div class="text-subtitle2">
                      Total de registros: {{ medicos.length }}
                    </div>
                  </div>
                  <q-card-section horizontal>
                    <q-card-section class="col-6">
                      <q-input
                        v-model="filter"
                        debounce="300"
                        placeholder="Buscar..."
                        outlined
                        dense
                        rounded
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </q-card-section>

                    <!-- <q-space /> -->

                    <q-card-actions align="right" class="q-ml-xl">
                      <q-toggle
                        color="red-10"
                        label="Cambiar formato de tabla"
                        v-model="gridMode"
                        val="yellow"
                        class="q-ml-xl text-primary text-weight-regular"
                      />
                      <q-separator vertical inset spaced />
                      <q-btn
                        color="primary"
                        icon-right="archive"
                        label="Exportar a Excel"
                        class="q-px-md"
                        style="width: 200px"
                        no-caps
                        dense
                        rounded
                        outline
                        @click="exportTable"
                      />
                    </q-card-actions>
                  </q-card-section>
                  <q-card-section class="q-pt-xs">
                    <div class="text-primary text-caption">
                      Condición afiliación Colmed
                    </div>
                    <div class="q-gutter-sm">
                      <q-toggle
                        v-for="afiliacion in estadosAfiliaciones"
                        v-model="selectedEstadosAfiliaciones"
                        :key="afiliacion"
                        :label="afiliacion"
                        color="red-10"
                        :val="afiliacion"
                        @update:model-value="filterAfiliacion"
                      >
                      </q-toggle>
                    </div>
                  </q-card-section>
                  <q-separator />
                </q-card>
              </template>
              <!-- <template v-slot:top-right>
                
                <div class="row items-center q-gutter-sm">
                  <q-toggle
                    color="red-10"
                    label="Cambiar formato de tabla"
                    v-model="gridMode"
                    val="yellow"
                    class="q-mr-sm text-primary text-weight-regular"
                  />
                  <q-btn
                    color="primary"
                    icon-right="archive"
                    label="Exportar CSV"
                    no-caps
                    @click="exportTable"
                  />
                </div>

                <q-input
                  v-model="filter"
                  debounce="300"
                  placeholder="Buscar..."
                  outlined
                  dense
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template> -->
              <template v-if="gridMode" v-slot:item="props">
                <div
                  class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-4 grid-style-transition"
                >
                  <q-card
                    bordered
                    flat
                    style="border-radius: 10%"
                    class="bg-teal-1 text-primary"
                  >
                    <q-list dense>
                      <q-item
                        v-for="col in props.cols.filter(
                          (col) => col.name !== 'acciones'
                        )"
                        :key="col.name"
                        class="q-mt-sm q-ml-xs"
                      >
                        <q-item-section class="flex flex-column">
                          <q-item-label overline class="text-bold"
                            >{{ col.label }}:</q-item-label
                          >
                          <q-item-label>{{ col.value }}</q-item-label>
                        </q-item-section>
                      </q-item>
                      <!-- Mostrar botón "Ver detalle" para la columna "acciones" -->
                      <q-item
                        v-if="props.cols.some((col) => col.name === 'acciones')"
                      >
                        <q-item-section>
                          <q-btn
                            label="Ver detalle"
                            color="primary"
                            flat
                            icon="info"
                            no-caps
                            rounded
                            @click="openDetailsDialog(props.row)"
                          />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </div>
              </template>
            </q-table>
          </div>
        </template>
      </q-splitter>
    </q-card>

    <q-dialog v-model="detailsDialog" persistent>
      <q-card
        style="min-width: 600px; border-radius: 20px"
        flat
        bordered
        class="bg-amber-4"
      >
        <q-card-section v-if="selectedMedico" class="text-secondary">
          <div class="row items-center q-pb-none text-secondary">
            <div class="text-h6">
              {{ selectedMedico.user.first_name }}
              {{ selectedMedico.user.last_name }}
            </div>
            <q-space />
            <q-btn icon="close" flat round dense @click="closeDetailsDialog" />
          </div>

          <div class="row no-wrap text-secondary">
            <!-- <div class="text-h6 q-mr-xs">Detalle de:</div> -->
            <div class="text-subtitle2">RUT: {{ selectedMedico.rut }}</div>
            <q-separator vertical spaced />
            <div class="text-subtitle2">ICM: {{ selectedMedico.icm }}</div>
          </div>
        </q-card-section>

        <q-tabs v-model="tab" class="text-teal">
          <q-tab label="Detalles del médico" name="detalle" no-caps />
          <q-tab
            label="Registro Superintendencia"
            name="superintendencia"
            no-caps
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-if="selectedMedico"
          v-model="tab"
          animated
          class="bg-amber-1"
        >
          <q-tab-panel name="detalle">
            <q-list
              bordered
              style="border-radius: 20px 0px 20px 20px"
              class="q-pb-md text-primary"
            >
              <q-scroll-area
                visible
                style="height: 390px"
                :thumb-style="thumbStyleRight"
                :bar-style="barStyleRight"
              >
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold">
                      Fecha de Nacimiento:
                    </q-item-label>
                    <q-item-label overline>{{
                      formatDate(selectedMedico.fecha_nacimiento)
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold">
                      Fecha de Título:
                    </q-item-label>
                    <q-item-label overline>{{
                      formatDate(selectedMedico.fecha_titulo)
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold">
                      Condición Vital:
                    </q-item-label>
                    <q-item-label overline>{{
                      selectedMedico.condicion_vital
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold">
                      Dirección:
                    </q-item-label>
                    <q-item-label overline>{{
                      selectedMedico.direccion
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold"> Comuna: </q-item-label>
                    <q-item-label overline>{{
                      selectedMedico.comuna
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item-label header class="text-primary text-weight-bold"
                  >Detalle afiliación Colegio Médico</q-item-label
                >
                <q-item-section
                  no-wrap
                  class="q-mx-sm bg-blue-1"
                  style="border-radius: 5px"
                >
                  {{ afiliaciones }}
                  <q-expansion-item
                    v-for="afiliacion in afiliaciones"
                    :key="afiliacion.id"
                    group="somegroup"
                    :label="afiliacion.entidad.nombre_entidad"
                    :default-opened="afiliacion.entidad.sigla === 'COLMED'"
                    header-class="text-overline text-weight-medium"
                  >
                    <q-card>
                      <q-item>
                        <q-item-section>
                          <q-item-label class="text-semibold">
                            Condición:
                          </q-item-label>
                          <q-item-label
                            v-if="afiliacion.condicion_afiliado"
                            overline
                            >{{ afiliacion.condicion_afiliado }}</q-item-label
                          >
                          <q-item-label v-else overline
                            >No informado</q-item-label
                          >
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label class="text-semibold">
                            Fecha inscripción:
                          </q-item-label>
                          <q-item-label
                            v-if="afiliacion.fecha_inscripcion"
                            overline
                            >{{
                              formatDate(afiliacion.fecha_inscripcion)
                            }}</q-item-label
                          >
                          <q-item-label v-else overline
                            >No informado</q-item-label
                          >
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label class="text-semibold">
                            Estamento:
                          </q-item-label>
                          <q-item-label v-if="afiliacion.estamento" overline
                            >{{ afiliacion.estamento.nombre_estamento }} - Cod:
                            {{
                              afiliacion.estamento.codigo_estamento
                            }}</q-item-label
                          >
                          <q-item-label v-else overline
                            >No informado</q-item-label
                          >
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label class="text-semibold">
                            Estado pago:
                          </q-item-label>
                          <q-item-label
                            v-if="afiliacion.estado_pago"
                            overline
                            >{{ afiliacion.estado_pago }}</q-item-label
                          >
                          <q-item-label v-else overline
                            >No informado</q-item-label
                          >
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label class="text-semibold">
                            Última cuota:
                          </q-item-label>
                          <q-item-label
                            v-if="afiliacion.mes_ucp && afiliacion.anio_ucp"
                            overline
                            >{{ afiliacion.mes_ucp }} /
                            {{ afiliacion.anio_ucp }}</q-item-label
                          >
                          <q-item-label v-else overline
                            >No informado</q-item-label
                          >
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label class="text-semibold">
                            Nº última cuota:
                          </q-item-label>
                          <q-item-label
                            v-if="afiliacion.num_ultima_cuota"
                            overline
                            >{{ afiliacion.num_ultima_cuota }}</q-item-label
                          >
                          <q-item-label v-else overline>{{
                            afiliacion.num_ultima_cuota
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label class="text-semibold">
                            Tipo de cuota:
                          </q-item-label>
                          <q-item-label v-if="afiliacion.tipo_cuota" overline>{{
                            afiliacion.tipo_cuota
                          }}</q-item-label>
                          <q-item-label v-else overline
                            >No informado</q-item-label
                          >
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label class="text-semibold">
                            Lugar de descuento:
                          </q-item-label>
                          <q-item-label
                            v-if="
                              afiliacion.lugar_descuento &&
                              afiliacion.lugar_descuento.nombre_lugar
                            "
                            overline
                            >{{
                              afiliacion.lugar_descuento.nombre_lugar
                            }}</q-item-label
                          >
                          <q-item-label v-else overline
                            >No informado</q-item-label
                          >
                        </q-item-section>
                      </q-item>
                    </q-card>
                  </q-expansion-item>
                </q-item-section>
              </q-scroll-area>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="superintendencia">
            <div class="text-semibold text-secondary" v-if="!certificadoSuper">
              No hay registros en el sistema.
            </div>
            <q-list
              bordered
              style="border-radius: 20px 0px 20px 20px"
              class="q-pb-md text-primary"
              v-if="certificadoSuper"
            >
              <q-scroll-area
                visible
                style="height: 390px"
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
              >
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold">
                      Número de registro:
                    </q-item-label>
                    <q-item-label overline>{{
                      certificadoSuper.numero_registro
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold">
                      Fecha de registro:
                    </q-item-label>
                    <q-item-label overline>{{
                      formatDate(certificadoSuper.fecha_registro)
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold">
                      Fecha de nacimiento:
                    </q-item-label>
                    <q-item-label overline>{{
                      formatDate(certificadoSuper.fecha_nacimiento)
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold">
                      Nacionalidad:
                    </q-item-label>
                    <q-item-label overline>{{
                      certificadoSuper.nacionalidad
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item>
                  <q-item-section class="text-semibold"
                    >Orden profesional:
                    <q-list
                      v-if="certificadoSuper.ordenes_profesionales.length"
                      style="border-radius: 20px"
                    >
                      <q-item
                        v-for="orden_profesional in certificadoSuper.ordenes_profesionales"
                        :key="orden_profesional.id"
                      >
                        <q-item-section>
                          <q-item-label>{{
                            orden_profesional.nombre
                          }}</q-item-label>
                          <q-item-label overline lines="3">{{
                            orden_profesional.descripcion
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                    <q-item-label v-else overline class="q-pl-md q-mt-xs"
                      >No posee información
                    </q-item-label></q-item-section
                  >
                </q-item>
                <q-item>
                  <q-item-section class="text-semibold"
                    >Especialidad certificada:
                    <q-list
                      v-if="certificadoSuper.especialidades.length"
                      style="border-radius: 20px"
                      class="q-pb-md"
                    >
                      <q-item
                        v-for="especialidad in certificadoSuper.especialidades"
                        :key="especialidad.id"
                      >
                        <q-item-section>
                          <q-item-label>{{ especialidad.nombre }}</q-item-label>
                          <q-item-label overline lines="3">{{
                            especialidad.descripcion
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                    <q-item-label v-else overline class="q-pl-md q-mt-xs"
                      >No posee información
                    </q-item-label></q-item-section
                  >
                </q-item>
              </q-scroll-area>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>

        <q-inner-loading
          :showing="!loading_registroSuper && !loading_medico"
          label="Cargando información..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="exportDataDialog" persistent backdrop-filter="blur(4px)">
      <q-card>
        <q-card-section class="items-center text-h6">
          Generando archivo ...
        </q-card-section>

        <q-card-section class="items-center">
          <q-spinner color="primary" size="3em" :thickness="10" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { exportFile, useQuasar } from "quasar";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMedicoStore } from "src/stores/medicos";

const medicoStore = useMedicoStore();
const medicos = computed(() => medicoStore.medicos);
const certificadoSuper = computed(
  () => medicoStore.certificado_medico_superintendencia
);
const afiliaciones = computed(() => medicoStore.afiliaciones);
const filter = ref("");
const loading = computed(() => medicoStore.loading);
const loading_medico = computed(() => medicoStore.loading_medico);
const loading_registroSuper = computed(() => medicoStore.loading_registroSuper);
const splitterModel = ref(280);
const gridMode = ref(false);
const initFilter = ref(false);

// Variables reactivas para almacenar las selecciones y filtros
const selectedEntidad = ref(["colmed"]);
const estadoAfiliacion = ref();
const selectedEstadosPago = ref([]);
const date = ref("1950/01/01");
const startDateBirthdate = ref(null);
const endDateBirthdate = ref(null);
const startDateTitle = ref(null);
const endDateTitle = ref(null);
const startDateInscription = ref(null);
const endDateInscription = ref(null);
const thumbStyle = {
  right: "4px",
  borderRadius: "7px",
  backgroundColor: "#185999",
  width: "4px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#185999",
  width: "8px",
  opacity: 0.2,
};

const thumbStyleRight = {
  right: "4px",
  borderRadius: "7px",
  backgroundColor: "#134678",
  width: "4px",
  opacity: 0.55,
};

const barStyleRight = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#134678",
  width: "8px",
  opacity: 0.2,
};

const errorStartDateBirth = ref({
  valor: false,
  mensaje: "",
});
const errorEndDateBirth = ref({
  valor: false,
  mensaje: "",
});
const errorStartDateTitle = ref({
  valor: false,
  mensaje: "",
});
const errorEndDateTitle = ref({
  valor: false,
  mensaje: "",
});
const errorStartDateInscription = ref({
  valor: false,
  mensaje: "",
});
const errorEndDateInscription = ref({
  valor: false,
  mensaje: "",
});

const filtros = {
  fecha_nacimiento_inicio: startDateBirthdate.value,
  fecha_nacimiento_fin: endDateBirthdate.value,
  fecha_titulo_inicio: startDateTitle.value,
  fecha_titulo_fin: endDateTitle.value,
  afiliaciones: selectedEntidad.value,
  estados: selectedEstadosPago.value,
};

// Opciones para los filtros
const entidadOptions = [
  { label: "Todos los médicos", value: "Todos los médicos" },
  { label: "Colmed", value: "Colmed" },
  { label: "No Colegiado", value: "No Colegiado" },
];

const estadoPagoOptions = [
  { label: "Al día", value: "al_dia", visible: true },
  { label: "Moroso", value: "moroso", visible: true },
  { label: "Moroso12", value: "moroso12", visible: false },
  { label: "Liberado", value: "liberado", visible: false },
  { label: "Casado con Médico", value: "casado_medico", visible: false },
  {
    label: "Falmed Senior Liberado",
    value: "falmed_senior_liberado",
    visible: false,
  },
  { label: "Liberado por Rescate", value: "liberado_rescate", visible: false },
  {
    label: "Liberado Directorio Falmed",
    value: "liberado_directorio_falmed",
    visible: false,
  },
  { label: "Recién Inscrito", value: "recien_inscrito", visible: false },
  {
    label: "Proceso a Desafiliar",
    value: "proceso_a_desafiliar",
    visible: false,
  },
];

const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.user.first_name + " " + row.user.last_name,
    sortable: true,
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
  },
  {
    name: "rut",
    align: "left",
    label: "RUT",
    field: "rut",
    sortable: true,
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
  },
  {
    name: "telefono",
    align: "left",
    label: "Teléfono",
    field: "contacto",
    format: (val) => (val == "nan" ? "No informado" : val),
    sortable: true,
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: (row) => (row.user.email ? row.user.email : "No informado"),
    sortable: true,
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
  },
  {
    name: "icm",
    align: "left",
    label: "ICM",
    field: "icm",
    format: (val) => (val ? val : "No informado"),
    sortable: true,
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
  },

  {
    name: "plaza",
    align: "left",
    label: "Plaza",
    field: "plaza",
    format: (val) =>
      val ? val.nombre + " - Cod: " + val.codigo : "No informado",
    sortable: true,
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
  },
  {
    name: "afiliacion_colmed",
    align: "left",
    label: "Afiliación Colmed",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionColmed = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "COLMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionColmed
        ? afiliacionColmed.condicion_afiliado || "No informado"
        : "No aplica";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "fecha_inscripcion_colmed",
    align: "left",
    label: "Fecha inscripción Colmed",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionColmed = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "COLMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionColmed
        ? afiliacionColmed.fecha_inscripcion || "No informado"
        : "No informado";
    },
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "estado_pago_colmed",
    align: "left",
    label: "Estado pago Colmed",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionColmed = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "COLMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionColmed
        ? afiliacionColmed.estado_pago || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "anio_ucp_colmed",
    align: "left",
    label: "Año UCP Colmed",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionColmed = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "COLMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionColmed
        ? afiliacionColmed.anio_ucp || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "mes_ucp_colmed",
    align: "left",
    label: "Mes UCP Colmed",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionColmed = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "COLMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionColmed
        ? afiliacionColmed.mes_ucp || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "estamento_colmed",
    align: "left",
    label: "Estamento | Código Colmed",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionColmed = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "COLMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionColmed
        ? afiliacionColmed.estamento.nombre_estamento +
            " Cod: " +
            afiliacionColmed.estamento.codigo_estamento || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "num_cuota_colmed",
    align: "left",
    label: "N° Cuota Colmed",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionColmed = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "COLMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionColmed
        ? afiliacionColmed.num_ultima_cuota || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "tipo_cuota_colmed",
    align: "left",
    label: "Tipo Cuota Colmed",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionColmed = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "COLMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionColmed
        ? afiliacionColmed.tipo_cuota || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "lugar_descuento_colmed",
    align: "left",
    label: "Lugar descuento Colmed",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionColmed = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "COLMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionColmed
        ? afiliacionColmed.lugar_descuento.nombre_lugar || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  //FSG
  {
    name: "afiliacion_fsg",
    align: "left",
    label: "Afiliación FSG",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFSG = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FSG"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFSG
        ? afiliacionFSG.condicion_afiliado || "No informado"
        : "No aplica";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "fecha_inscripcion_fsg",
    align: "left",
    label: "Fecha inscripción FSG",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFSG = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FSG"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFSG
        ? afiliacionFSG.fecha_inscripcion || "No informado"
        : "No informado";
    },
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "estado_pago_fsg",
    align: "left",
    label: "Estado pago FSG",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFSG = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FSG"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFSG
        ? afiliacionFSG.estado_pago || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "anio_ucp_fsg",
    align: "left",
    label: "Año UCP FSG",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFSG = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FSG"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFSG
        ? afiliacionFSG.anio_ucp || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "mes_ucp_fsg",
    align: "left",
    label: "Mes UCP FSG",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFSG = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FSG"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFSG
        ? afiliacionFSG.mes_ucp || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "estamento_fsg",
    align: "left",
    label: "Estamento | Código FSG",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFSG = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FSG"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFSG
        ? afiliacionFSG.estamento.nombre_estamento +
            " Cod: " +
            afiliacionFSG.estamento.codigo_estamento || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "num_cuota_fsg",
    align: "left",
    label: "N° Cuota FSG",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFSG = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FSG"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFSG
        ? afiliacionFSG.num_ultima_cuota || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "tipo_cuota_fsg",
    align: "left",
    label: "Tipo Cuota FSG",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFSG = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FSG"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFSG
        ? afiliacionFSG.tipo_cuota || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "lugar_descuento_fsg",
    align: "left",
    label: "Lugar descuento FSG",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFSG = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FSG"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFSG
        ? afiliacionFSG.lugar_descuento.nombre_lugar || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  //Falmed
  {
    name: "afiliacion_falmed",
    align: "left",
    label: "Afiliación FALMED",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFALMED = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FALMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFALMED
        ? afiliacionFALMED.condicion_afiliado || "No informado"
        : "No aplica";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "fecha_inscripcion_falmed",
    align: "left",
    label: "Fecha inscripción FALMED",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFALMED = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FALMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFALMED
        ? afiliacionFALMED.fecha_inscripcion || "No informado"
        : "No informado";
    },
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "estado_pago_falmed",
    align: "left",
    label: "Estado pago FALMED",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFALMED = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FALMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFALMED
        ? afiliacionFALMED.estado_pago || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "anio_ucp_falmed",
    align: "left",
    label: "Año UCP FALMED",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFALMED = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FALMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFALMED
        ? afiliacionFALMED.anio_ucp || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "mes_ucp_falmed",
    align: "left",
    label: "Mes UCP FALMED",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFALMED = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FALMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFALMED
        ? afiliacionFALMED.mes_ucp || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "estamento_falmed",
    align: "left",
    label: "Estamento | Código FALMED",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFALMED = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FALMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFALMED
        ? afiliacionFALMED.estamento.nombre_estamento +
            " Cod: " +
            afiliacionFALMED.estamento.codigo_estamento || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "num_cuota_falmed",
    align: "left",
    label: "N° Cuota FALMED",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFALMED = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FALMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFALMED
        ? afiliacionFALMED.num_ultima_cuota || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "tipo_cuota_falmed",
    align: "left",
    label: "Tipo Cuota FALMED",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFALMED = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FALMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFALMED
        ? afiliacionFALMED.tipo_cuota || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "lugar_descuento_falmed",
    align: "left",
    label: "Lugar descuento FALMED",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionFALMED = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "FALMED"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionFALMED
        ? afiliacionFALMED.lugar_descuento.nombre_lugar || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  //Club campo
  {
    name: "afiliacion_club",
    align: "left",
    label: "Afiliación Club Campo",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionClub = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "CLUB CAMPO"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionClub
        ? afiliacionClub.condicion_afiliado || "No informado"
        : "No aplica";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "fecha_inscripcion_club",
    align: "left",
    label: "Fecha inscripción Club Campo",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionClub = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "CLUB CAMPO"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionClub
        ? afiliacionClub.fecha_inscripcion || "No informado"
        : "No informado";
    },
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "estado_pago_club",
    align: "left",
    label: "Estado pago Club Campo",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionClub = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "CLUB CAMPO"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionClub
        ? afiliacionClub.estado_pago || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "anio_ucp_club",
    align: "left",
    label: "Año UCP Club Campo",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionClub = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "CLUB CAMPO"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionClub
        ? afiliacionClub.anio_ucp || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "mes_ucp_club",
    align: "left",
    label: "Mes UCP Club Campo",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionClub = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "CLUB CAMPO"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionClub
        ? afiliacionClub.mes_ucp || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "estamento_club",
    align: "left",
    label: "Estamento | Código Club Campo",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionClub = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "CLUB CAMPO"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionClub
        ? afiliacionClub.estamento.nombre_estamento +
            " Cod: " +
            afiliacionClub.estamento.codigo_estamento || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "num_cuota_club",
    align: "left",
    label: "N° Cuota Club Campo",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionClub = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "CLUB CAMPO"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionClub
        ? afiliacionClub.num_ultima_cuota || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "tipo_cuota_club",
    align: "left",
    label: "Tipo Cuota Club Campo",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionClub = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "CLUB CAMPO"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionClub
        ? afiliacionClub.tipo_cuota || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "lugar_descuento_club",
    align: "left",
    label: "Lugar descuento Club Campo",
    headerStyle:
      "background-color: #4682B4; color: white; font-weight: bold; font-size: 14px",
    field: (row) => {
      // Buscar la afiliación COLMED
      const afiliacionClub = row.afiliaciones?.find(
        (afiliacion) => afiliacion.entidad?.sigla === "CLUB CAMPO"
      );

      // Retornar la condición de afiliado o "No aplica"
      return afiliacionClub
        ? afiliacionClub.lugar_descuento.nombre_lugar || "No informado"
        : "No informado";
    },
    format: (val) => val,
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acción",
    align: "center",
    field: "action",
  },
];

const columnasVisiblesGridMod = ref([
  "nombre",
  "rut",
  "telefono",
  "email",
  "icm",
  "plaza",
  "afiliacion",
  "acciones",
]);
const columnasVisiblesNotGridMod = ref([
  "nombre",
  "rut",
  "telefono",
  "email",
  "icm",
  "plaza",
  //Colegio Medico
  "afiliacion_colmed",
  "fecha_inscripcion_colmed",
  "estado_pago_colmed",
  "anio_ucp_colmed",
  "mes_ucp_colmed",
  "estamento_colmed",
  "num_cuota_colmed",
  "lugar_descuento_colmed",
  "tipo_cuota_colmed",
  //FSG
  "afiliacion_fsg",
  "fecha_inscripcion_fsg",
  "estado_pago_fsg",
  "anio_ucp_fsg",
  "mes_ucp_fsg",
  "estamento_fsg",
  "num_cuota_fsg",
  "lugar_descuento_fsg",
  "tipo_cuota_fsg",
  //Falmed
  "afiliacion_falmed",
  "fecha_inscripcion_falmed",
  "estado_pago_falmed",
  "anio_ucp_falmed",
  "mes_ucp_falmed",
  "estamento_falmed",
  "num_cuota_falmed",
  "lugar_descuento_falmed",
  "tipo_cuota_falmed",
  //club
  "afiliacion_club",
  "fecha_inscripcion_club",
  "estado_pago_club",
  "anio_ucp_club",
  "mes_ucp_club",
  "estamento_club",
  "num_cuota_club",
  "lugar_descuento_club",
  "tipo_cuota_club",
  //Fatmed
  "afiliacion_fatmed",
  "fecha_inscripcion_fatmed",
  "estado_pago_fatmed",
  "anio_ucp_fatmed",
  "mes_ucp_fatmed",
  "estamento_fatmed",
  "num_cuota_fatmed",
  "lugar_descuento_fatmed",
  "tipo_cuota_fatmed",
]);
// Variables para el diálogo de detalles
const detailsDialog = ref(false);
const exportDataDialog = ref(false);
const selectedMedico = ref(null);
const tab = ref("detalle");
const medicosFiltrados = ref(null);
const selectedEstadosAfiliaciones = ref([]);
const estadosAfiliaciones = computed(() => {
  // Filtrar afiliaciones COLMED
  const afiliacionesColmed = medicos.value.flatMap(
    (m) => m.afiliaciones?.filter((a) => a.entidad?.sigla === "COLMED") || []
  );
  // Extraer los estados y eliminar duplicados
  const estados = afiliacionesColmed.map((a) => a.condicion_afiliado);
  return [...new Set(estados)]; // Devuelve un arreglo sin repeticiones
});

const filterAfiliacion = () => {
  // 1) Si el usuario NO tiene ningún estado seleccionado, mostramos todo
  if (!selectedEstadosAfiliaciones.value.length) {
    medicosFiltrados.value = medicos.value;
    return;
  }

  // 2) Filtramos sólo los médicos que tengan una afiliación COLMED
  //    cuyo 'condicion_afiliado' esté en 'selectedEstadosAfiliaciones'
  const resultado = medicos.value.filter((medico) => {
    // Buscamos las afiliaciones COLMED
    const afiliacionesColmed =
      medico.afiliaciones?.filter((a) => a.entidad?.sigla === "COLMED") || [];

    // Retorna true si AL MENOS una coincide con el set de seleccionados
    return afiliacionesColmed.some((af) =>
      selectedEstadosAfiliaciones.value.includes(af.condicion_afiliado)
    );
  });

  medicosFiltrados.value = resultado;
};

//Variables para el detalle del registro Superintendencia.
const popUpSuperintendencia = ref(false);

const pagination = ref({
  page: 1,
  rowsPerPage: 6,
});

dayjs.extend(customParseFormat);
const $q = useQuasar();

const generateJsonData = (medicos) => {
  return medicos.map((m) => {
    const afiliaciones = m.afiliaciones || [];

    // Función para encontrar la afiliación por sigla
    const getAfiliacionBySigla = (sigla) =>
      afiliaciones.find((af) => af.entidad.sigla === sigla);

    // Buscar afiliaciones específicas
    const colmed = getAfiliacionBySigla("COLMED") || {};
    const fsg = getAfiliacionBySigla("FSG") || {};
    const falmed = getAfiliacionBySigla("FALMED") || {};
    const fatmed = getAfiliacionBySigla("FATMED") || {};
    const club = getAfiliacionBySigla("CLUB CAMPO") || {};

    // Función para mapear los campos de afiliación
    const mapAfiliacionFields = (afiliacion) => ({
      Condicion_Socio: afiliacion.condicion_afiliado || "",
      Estado_Pago: afiliacion.estado_pago || "",
      Año_UCP: afiliacion.anio_ucp || "",
      Mes_UCP: afiliacion.mes_ucp || "",
      Estamento: afiliacion.estamento?.nombre_estamento || "",
      Cod_Estamento: afiliacion.estamento?.codigo_estamento || "",
      Num_Cuota: afiliacion.num_ultima_cuota || "",
      Lugar_Descuento: afiliacion.lugar_descuento?.nombre_lugar || "",
      Tipo_cuota: afiliacion.tipo_cuota || "",

      Fecha_inscripción: afiliacion.fecha_inscripcion || "",
    });

    return {
      Icm: m.icm || "",
      Rut: m.rut,
      Nombre: `${m.user?.first_name || ""} ${m.user?.last_name || ""}`.trim(),
      Fecha_nacimiento: m.fecha_nacimiento || "",
      Condicion_vital: m.condicion_vital || "",

      // Mapear afiliaciones por sigla

      Condicion_Socio_COLMED: mapAfiliacionFields(colmed).Condicion_Socio,
      Estado_Pago_COLMED: mapAfiliacionFields(colmed).Estado_Pago,
      Año_UCP_COLMED: mapAfiliacionFields(colmed).Año_UCP,
      Mes_UCP_COLMED: mapAfiliacionFields(colmed).Mes_UCP,
      Estamento_COLMED: mapAfiliacionFields(colmed).Estamento,
      Cod_Estamento_COLMED: mapAfiliacionFields(colmed).Cod_Estamento,
      Num_Cuota_COLMED: mapAfiliacionFields(colmed).Num_Cuota,
      Lugar_Descuento_COLMED: mapAfiliacionFields(colmed).Lugar_Descuento,
      Tipo_cuota_COLMED: mapAfiliacionFields(colmed).Tipo_cuota,
      Fecha_inscripción_COLMED: mapAfiliacionFields(colmed).Fecha_inscripción,

      Condicion_Socio_FSG: mapAfiliacionFields(fsg).Condicion_Socio,
      Estado_Pago_FSG: mapAfiliacionFields(fsg).Estado_Pago,
      Año_UCP_FSG: mapAfiliacionFields(fsg).Año_UCP,
      Mes_UCP_FSG: mapAfiliacionFields(fsg).Mes_UCP,
      Estamento_FSG: mapAfiliacionFields(fsg).Estamento,
      Cod_Estamento_FSG: mapAfiliacionFields(fsg).Cod_Estamento,
      Num_Cuota_FSG: mapAfiliacionFields(fsg).Num_Cuota,
      Lugar_Descuento_FSG: mapAfiliacionFields(fsg).Lugar_Descuento,
      Tipo_cuota_FSG: mapAfiliacionFields(fsg).Tipo_cuota,
      Fecha_inscripción_FSG: mapAfiliacionFields(fsg).Fecha_inscripción,

      Condicion_Socio_FALMED: mapAfiliacionFields(falmed).Condicion_Socio,
      Estado_Pago_FALMED: mapAfiliacionFields(falmed).Estado_Pago,
      Año_UCP_FALMED: mapAfiliacionFields(falmed).Año_UCP,
      Mes_UCP_FALMED: mapAfiliacionFields(falmed).Mes_UCP,
      Estamento_FALMED: mapAfiliacionFields(falmed).Estamento,
      Cod_Estamento_FALMED: mapAfiliacionFields(falmed).Cod_Estamento,
      Num_Cuota_FALMED: mapAfiliacionFields(falmed).Num_Cuota,
      Lugar_Descuento_FALMED: mapAfiliacionFields(falmed).Lugar_Descuento,
      Tipo_cuota_FALMED: mapAfiliacionFields(falmed).Tipo_cuota,
      Fecha_inscripción_FALMED: mapAfiliacionFields(falmed).Fecha_inscripción,

      Condicion_Socio_CLUB: mapAfiliacionFields(club).Condicion_Socio,
      Estado_Pago_CLUB: mapAfiliacionFields(club).Estado_Pago,
      Año_UCP_CLUB: mapAfiliacionFields(club).Año_UCP,
      Mes_UCP_CLUB: mapAfiliacionFields(club).Mes_UCP,
      Estamento_CLUB: mapAfiliacionFields(club).Estamento,
      Cod_Estamento_CLUB: mapAfiliacionFields(club).Cod_Estamento,
      Num_Cuota_CLUB: mapAfiliacionFields(club).Num_Cuota,
      Lugar_Descuento_CLUB: mapAfiliacionFields(club).Lugar_Descuento,
      Tipo_cuota_CLUB: mapAfiliacionFields(club).Tipo_cuota,
      Fecha_inscripción_CLUB: mapAfiliacionFields(club).Fecha_inscripción,

      Condicion_Socio_FATMED: mapAfiliacionFields(fatmed).Condicion_Socio,
      Estado_Pago_FATMED: mapAfiliacionFields(fatmed).Estado_Pago,
      Año_UCP_FATMED: mapAfiliacionFields(fatmed).Año_UCP,
      Mes_UCP_FATMED: mapAfiliacionFields(fatmed).Mes_UCP,
      Estamento_FATMED: mapAfiliacionFields(fatmed).Estamento,
      Cod_Estamento_FATMED: mapAfiliacionFields(fatmed).Cod_Estamento,
      Num_Cuota_FATMED: mapAfiliacionFields(fatmed).Num_Cuota,
      Lugar_Descuento_FATMED: mapAfiliacionFields(fatmed).Lugar_Descuento,
      Tipo_cuota_FATMED: mapAfiliacionFields(fatmed).Tipo_cuota,
      Fecha_inscripción_FATMED: mapAfiliacionFields(fatmed).Fecha_inscripción,
    };
  });
};

const exportTable = () => {
  exportDataDialog.value = true;
  const wb = XLSX.utils.book_new(); // 1) Crea Workbook
  wb.Props = {
    Title: "Médicos Filtrados",
    Subject: "Export de datos",
    Author: "Mi App Quasar",
    CreatedDate: new Date(),
  };

  // Data a exportar; asumiendo que medicos.value es la data final (array de objetos)
  // conviene transformarla en un array "flat" si tiene campos anidados
  const jsonData = medicosFiltrados.value
    ? generateJsonData(medicosFiltrados.value)
    : generateJsonData(medicos.value);

  const ws = XLSX.utils.json_to_sheet(jsonData, { origin: "A1" });

  // 3) Añade la Worksheet al Workbook
  XLSX.utils.book_append_sheet(wb, ws, "Hoja1");

  // 4) Genera un array buffer con el contenido binario XLSX
  const wbout = XLSX.write(wb, {
    bookType: "xlsx", // Excel moderno
    type: "array", // salida en array buffer
  });

  // 5) Crea un Blob a partir del array buffer
  const blob = new Blob([wbout], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // 6) Usa exportFile para forzar la descarga
  const status = exportFile("medicos-filtrados.xlsx", blob, {
    // mimeType no es estrictamente necesario si ya pones en el Blob
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (status !== true) {
    $q.notify({
      message: "No se pudo descargar el archivo...",
      color: "negative",
      icon: "warning",
    });
  }

  exportDataDialog.value = false;
};

const updateProxyStartBirthdate = () => {
  startDateBirthdate.value = startDateBirthdate.value
    ? startDateBirthdate.value
    : date.value;
};
const updateProxyEndBirthdate = () => {
  endDateBirthdate.value = endDateBirthdate.value
    ? endDateBirthdate.value
    : date.value;
};
const updateProxyStartTitledate = () => {
  startDateTitle.value = startDateTitle.value
    ? startDateTitle.value
    : date.value;
};
const updateProxyEndTitledate = () => {
  endDateTitle.value = endDateTitle.value ? endDateTitle.value : date.value;
};
const updateProxyStartInscriptiondate = () => {
  startDateInscription.value = startDateInscription.value
    ? startDateInscription.value
    : date.value;
};
const updateProxyEndInscriptiondate = () => {
  endDateInscription.value = endDateInscription.value
    ? endDateInscription.value
    : date.value;
};

const saveBirthdate = () => {
  // 1. Limpiar los errores antes de validar
  errorStartDateBirth.value.valor = false;
  errorStartDateBirth.value.mensaje = "";
  errorEndDateBirth.value.valor = false;
  errorEndDateBirth.value.mensaje = "";

  if (!startDateBirthdate.value || !endDateBirthdate.value) {
    filterData();
    return;
  }

  const inicio = dayjs(startDateBirthdate.value, "YYYY/MM/DD");
  const fin = dayjs(endDateBirthdate.value, "YYYY/MM/DD");

  if (inicio.isAfter(fin)) {
    errorStartDateBirth.value.valor = true;
    errorStartDateBirth.value.mensaje =
      "Fecha 'Desde' no puede ser mayor que la fecha 'Hasta'.";

    console.log("Fecha 'Desde' no puede ser mayor que la fecha 'Hasta'.");
    return;
  }
  if (fin.isBefore(inicio)) {
    errorEndDateBirth.value.valor = true;
    errorEndDateBirth.value.mensaje =
      "Fecha 'Hasta' no puede ser menor que la fecha 'Desde'.";
    return;
  }

  filterData();
};
const saveTitledate = () => {
  // 1. Limpiar los errores antes de validar
  errorStartDateTitle.value.valor = false;
  errorStartDateTitle.value.mensaje = "";
  errorEndDateTitle.value.valor = false;
  errorEndDateTitle.value.mensaje = "";

  if (!startDateTitle.value || !endDateTitle.value) {
    filterData();
    return;
  }

  const inicio = dayjs(startDateTitle.value, "YYYY/MM/DD");
  const fin = dayjs(endDateTitle.value, "YYYY/MM/DD");

  if (inicio.isAfter(fin)) {
    errorStartDateTitle.value.valor = true;
    errorStartDateTitle.value.mensaje =
      "Fecha 'Desde' no puede ser mayor que la fecha 'Hasta'.";
    return;
  }
  if (fin.isBefore(inicio)) {
    errorEndDateTitle.value.valor = true;
    errorEndDateTitle.value.mensaje =
      "Fecha 'Hasta' no puede ser menor que la fecha 'Desde'.";
    return;
  }

  filterData();
};
const saveInscriptiondate = () => {
  // 1. Limpiar los errores antes de validar
  errorStartDateInscription.value.mensaje = "";
  errorStartDateInscription.value.valor = false;
  errorEndDateInscription.value.valor = false;
  errorEndDateInscription.value.mensaje = "";

  if (!startDateInscription.value || !endDateInscription.value) {
    filterData();
    return;
  }

  const inicio = dayjs(startDateInscription.value, "YYYY/MM/DD");
  const fin = dayjs(endDateInscription.value, "YYYY/MM/DD");

  if (inicio.isAfter(fin)) {
    errorStartDateInscription.value.valor = true;
    errorStartDateInscription.value.mensaje =
      "Fecha 'Desde' no puede ser mayor que la fecha 'Hasta'.";
    return;
  }
  if (fin.isBefore(inicio)) {
    errorEndDateInscription.value.valor = true;
    errorEndDateInscription.value.mensaje =
      "Fecha 'Hasta' no puede ser menor que la fecha 'Desde'.";
    return;
  }

  filterData();
};

//Método para cerrar el diálogo y limpiar datos
const closeDetailsDialog = () => {
  selectedMedico.value = null;
  medicoStore.limpiarDetalleMedico();
  detailsDialog.value = false;
};

//Método para abrir el diálogo y asignar el médico seleccionado
const openDetailsDialog = async (medico) => {
  detailsDialog.value = true;
  await medicoStore.fetchAfiliaciones(medico.id);
  if (medico.registro_superintendencia)
    await medicoStore.fetchRegistroSuperintendencia(
      medico.registro_superintendencia
    );
  selectedMedico.value = medico;

  if (selectedMedico.value.comuna == "nan" || !selectedMedico.value.comuna)
    selectedMedico.value.comuna = "No informado";
  else selectedMedico.value.comuna = selectedMedico.value.comuna.trim();

  if (
    selectedMedico.value.direccion &&
    (selectedMedico.value.direccion !== "No informado" ||
      selectedMedico.value.direccion !== "nan")
  )
    selectedMedico.value.direccion = selectedMedico.value.direccion.trim();

  if (selectedMedico.value.condicionVital == "nan") {
    selectedMedico.value.condicionVital = "No informado";
  }

  if (selectedMedico.value.user.contacto == "nan") {
    selectedMedico.value.user.contacto = "No informado";
  }

  if (selectedMedico.value.plaza) {
    selectedMedico.value.plaza =
      selectedMedico.value.plaza.nombre +
      " - Cod: " +
      selectedMedico.value.plaza.codigo;
  }

  if (!selectedMedico.value.fecha_nacimiento) {
    selectedMedico.value.fecha_nacimiento = "No informado";
  }

  if (!selectedMedico.value.fecha_titulo) {
    selectedMedico.value.fecha_titulo = "No informado";
  }

  if (!selectedMedico.value.icm) {
    selectedMedico.value.icm = "No informado";
  }

  if (!selectedMedico.value.user.email) {
    selectedMedico.value.user.email = "No informado";
  }
};

const estadosVisibles = () => {
  return estadoPagoOptions.filter((estado) => estado.visible);
};
const estadosOcultos = () => {
  return estadoPagoOptions.filter((estado) => !estado.visible);
};

const cancelEndDateBirthdate = () => {
  endDateBirthdate.value = null;
  filterData();
};
const cancelStartDateBirthdate = () => {
  startDateBirthdate.value = null;
  filterData();
};
const cancelEndDateTitle = () => {
  endDateTitle.value = null;
  filterData();
};
const cancelStartDateTitle = () => {
  startDateTitle.value = null;
  filterData();
};
const cancelStartDateInscription = () => {
  startDateInscription.value = null;
  filterData();
};
const cancelEndDateInscription = () => {
  endDateInscription.value = null;
  filterData();
};

const filterData = async () => {
  initFilter.value = true;
  errorEndDateBirth.value.valor = false;
  errorEndDateBirth.value.mensaje = "";

  errorStartDateBirth.value.valor = false;
  errorStartDateBirth.value.mensaje = "";

  errorStartDateTitle.value.valor = false;
  errorStartDateTitle.value.mensaje = "";

  errorEndDateTitle.value.valor = false;
  errorEndDateTitle.value.mensaje = "";

  errorStartDateInscription.value.valor = false;
  errorStartDateInscription.value.mensaje = "";

  errorEndDateInscription.value.valor = false;
  errorEndDateInscription.value.mensaje = "";

  //filtros.fecha_nacimiento_inicio = startDateBirthdate.value;
  //filtros.fecha_nacimiento_fin = endDateBirthdate.value;
  selectedEstadosAfiliaciones.value = [];
  medicosFiltrados.value = null;
  const filtros = {
    fecha_nacimiento_inicio: startDateBirthdate.value,
    fecha_nacimiento_fin: endDateBirthdate.value,
    fecha_titulo_inicio: startDateTitle.value,
    fecha_titulo_fin: endDateTitle.value,
    fecha_inscripcion_inicio: startDateInscription.value,
    fecha_inscripcion_fin: endDateInscription.value,
    afiliaciones: selectedEntidad.value,
    estados_pago: selectedEstadosPago.value,
  };

  await medicoStore.filterDataMedicos(filtros);
  initFilter.value = false;
};

const clearFilter = async () => {
  startDateBirthdate.value = null;
  startDateTitle.value = null;
  startDateInscription.value = null;
  endDateBirthdate.value = null;
  endDateTitle.value = null;
  endDateInscription.value = null;
  selectedEntidad.value = ["colmed"];
  selectedEstadosPago.value = [];
  await medicoStore.filterDataMedicos({ afiliaciones: "colmed" });
};

const validarFecha = (val) => {
  const formato = "DD-MM-YYYY";
  return dayjs(val, formato, true).isValid();
};

const formatDate = (dateString) => {
  // Si está vacío o es "No informado", devuélvelo tal cual
  if (!dateString || dateString === "No informado") {
    return "No informado";
  }
  return dayjs(dateString).format("DD-MM-YYYY");
};
</script>
<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 650px

  .q-table__top,

  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: $lime-1



  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
