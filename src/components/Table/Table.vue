<template>
  <div>
    <b-collapse class="columnOptions" :open="false">
      <button class="button is-primary" id="columnOptions" slot="trigger">
        Show/Hide Column Option
      </button>
      <div id="toggleArea">
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Initial information:</h4>
          <div class="checkboxDiv">
            <div
              v-for="(state, name) in VIEWABLE_COLUMNS['INITIAL_INFO']"
              :key="name"
              class="control"
            >
              <b-checkbox v-model="VIEWABLE_COLUMNS['INITIAL_INFO'][name]">
                {{ COLUMNS_TO_LABELS[name] }}
              </b-checkbox>
            </div>
          </div>
        </div>
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Dates:</h4>
          <div class="checkboxDiv">
            <div
              v-for="(state, name) in VIEWABLE_COLUMNS['DATES']"
              :key="name"
              class="control"
            >
              <b-checkbox v-model="VIEWABLE_COLUMNS['DATES'][name]">
                {{ COLUMNS_TO_LABELS[name] }}
              </b-checkbox>
            </div>
          </div>
        </div>
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Current information:</h4>
          <div class="checkboxDiv">
            <div
              v-for="(state, name) in VIEWABLE_COLUMNS['CURRENT_INFO']"
              :key="name"
              class="control"
            >
              <b-checkbox v-model="VIEWABLE_COLUMNS['CURRENT_INFO'][name]">
                {{ COLUMNS_TO_LABELS[name] }}
              </b-checkbox>
            </div>
          </div>
        </div>
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Analysis:</h4>
          <div class="checkboxDiv">
            <div
              v-for="(state, name) in VIEWABLE_COLUMNS['ANALYSIS']"
              :key="name"
              class="control"
            >
              <b-checkbox v-model="VIEWABLE_COLUMNS['ANALYSIS'][name]">
                {{ COLUMNS_TO_LABELS[name] }}
              </b-checkbox>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
    <section class="tableInfo">
      <!-- <span>
        <b class="totalChecked">Total selected: {{ checkedRows.length }}</b>
      </span>-->
      <download-csv
        class="download"
        :data="prepareDataForExporting(data)"
        :fields="FIELDS_TO_EXPORT"
      >
        <b-button type="is-primary" rounded>Download all</b-button>
      </download-csv>
      <download-csv
        class="download"
        :data="prepareDataForExporting(data)"
        :fields="filterFieldsToExport(FIELDS_TO_EXPORT, VIEWABLE_COLUMNS)"
      >
        <b-button type="is-link" rounded outlined
          >Download only visible columns</b-button
        >
      </download-csv>
    </section>
    <b-table
      :data="data"
      :columns="columns"
      :checked-rows.sync="checkedRows"
      checkbox-position="left"
      checkable
      hoverable
      paginated
      :current-page.sync="currentPage"
      paginationPosition="bottom"
      per-page="25"
      default-sort-direction="asc"
      default-sort="county"
    >
      <template slot-scope="props">
        <b-table-column centered>
          <b-button
            field="id"
            type="is-primary"
            outlined
            tag="router-link"
            :to="{
              name: 'Form',
              params: {
                initialData: data.find((el) => el['id'] == props.row.id),
                updating: true,
              },
            }"
            >View</b-button
          >
        </b-table-column>
        <b-table-column
          field="county"
          label="County"
          searchable
          centered
          sortable
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['county']"
        >
          <span class="tag is-medium">{{ props.row.county }}</span>
        </b-table-column>
        <b-table-column
          field="lea"
          label="LEA"
          searchable
          centered
          sortable
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['lea']"
        >
          <span class="tag is-medium">{{ props.row.lea }}</span>
        </b-table-column>
        <b-table-column
          field="currentstatus"
          label="Status"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['CURRENT_INFO']['currentstatus']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.currentstatus }}</span>
        </b-table-column>
        <b-table-column
          field="dateofrequest"
          label="Date of request"
          centered
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['dateofrequest']"
          sortable
          :custom-sort="dateSort('dateofrequest')"
        >
          <span class="tag is-medium">
            {{
              props.row.dateofrequest
                ? new Date(props.row.dateofrequest).toLocaleDateString()
                : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="startdaterequested"
          label="Start date requested"
          centered
          :visible="VIEWABLE_COLUMNS['DATES']['startdaterequested']"
          sortable
          :custom-sort="dateSort('startdaterequested')"
        >
          <span class="tag is-medium">
            {{
              props.row.startdaterequested
                ? new Date(props.row.startdaterequested).toLocaleDateString()
                : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="enddaterequested"
          label="End date requested"
          centered
          :visible="VIEWABLE_COLUMNS['DATES']['enddaterequested']"
          sortable
          :custom-sort="dateSort('enddaterequested')"
        >
          <span class="tag is-medium">
            {{
              props.row.enddaterequested
                ? new Date(props.row.enddaterequested).toLocaleDateString()
                : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="startdatereturned"
          label="Start date returned"
          centered
          :visible="VIEWABLE_COLUMNS['DATES']['startdatereturned']"
          sortable
          :custom-sort="dateSort('startdatereturned')"
        >
          <span class="tag is-medium">
            {{
              props.row.startdatereturned
                ? new Date(props.row.startdatereturned).toLocaleDateString()
                : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="enddatereturned"
          label="End date returned"
          centered
          :visible="VIEWABLE_COLUMNS['DATES']['enddatereturned']"
          sortable
          :custom-sort="dateSort('enddatereturned')"
        >
          <span class="tag is-medium">
            {{
              props.row.enddatereturned
                ? new Date(props.row.enddatereturned).toLocaleDateString()
                : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="dateoflastcontact"
          label="Date of last contact"
          centered
          :visible="VIEWABLE_COLUMNS['CURRENT_INFO']['dateoflastcontact']"
          sortable
          :custom-sort="dateSort('dateoflastcontact')"
        >
          <span class="tag is-medium">
            {{
              props.row.dateoflastcontact
                ? new Date(props.row.dateoflastcontact).toLocaleDateString()
                : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="linktoprarequest"
          label="Link to PRA Request"
          centered
          :visible="VIEWABLE_COLUMNS['CURRENT_INFO']['linktoprarequest']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.linktoprarequest }}</span>
        </b-table-column>
        <b-table-column
          field="leadmember"
          label="Lead member"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['CURRENT_INFO']['leadmember']"
          sortable
        >
          <span class="tag is-info is-medium">{{ props.row.leadmember }}</span>
        </b-table-column>
        <b-table-column
          field="issheriffsdept"
          label="SD/PD"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['issheriffsdept']"
          sortable
        >
          <span class="tag is-medium">{{
            props.row.issheriffsdept ? "SD" : "PD"
          }}</span>
        </b-table-column>
        <b-table-column
          field="datatype"
          label="Data type"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['datatype']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.datatype }}</span>
        </b-table-column>
        <b-table-column
          field="datereceived"
          label="Date received"
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['datereceived']"
          sortable
          :custom-sort="dateSort('datereceived')"
        >
          <span class="tag is-medium">
            {{
              props.row.datereceived
                ? new Date(props.row.datereceived).toLocaleDateString()
                : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="variableschecked"
          label="Variables checked"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['variableschecked']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.variableschecked }}</span>
        </b-table-column>
        <b-table-column
          field="variablescomplete"
          label="Variables complete"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['variablescomplete']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.variablescomplete }}</span>
        </b-table-column>
        <b-table-column
          field="dataqualitychecked"
          label="Quality checked"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['dataqualitychecked']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.dataqualitychecked }}</span>
        </b-table-column>
        <b-table-column
          field="dataactionable"
          label="Actionable"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['dataactionable']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.dataactionable }}</span>
        </b-table-column>
        <b-table-column
          field="datacleaned"
          label="Cleaned"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['datacleaned']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.datacleaned }}</span>
        </b-table-column>
        <b-table-column
          field="datageocoded"
          label="Geocoded"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['datageocoded']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.datageocoded }}</span>
        </b-table-column>
        <b-table-column
          field="dataanalyzed"
          label="Analyzed"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['dataanalyzed']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.dataanalyzed }}</span>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import JsonCSV from "vue-json-csv";

import {
  COLUMNS_TO_LABELS,
  VIEWABLE_COLUMNS,
  SEARCHABLE_COLUMNS,
  FIELDS_TO_EXPORT,
} from "../../definitions.js";

import { prepareDataForExporting, filterFieldsToExport } from "./csvExport.js";

export default {
  name: "Table",
  data() {
    return {
      data: [],
      columns: [],
      checkedRows: [],
      currentPage: 1,
      VIEWABLE_COLUMNS,
      COLUMNS_TO_LABELS,
      FIELDS_TO_EXPORT,
      prepareDataForExporting,
      filterFieldsToExport,
    };
  },
  mounted() {
    axios
      .get("https://pra-tracking-dev.herokuapp.com/api/pra?fields=all")
      .then((response) => (this.data = response.data));
  },
  methods: {
    // Used to sort dates in the table. First pass in the field name,
    //   which returns the function to sort that field.
    dateSort(field) {
      return function(a, b, isAsc) {
        return isAsc
          ? new Date(b[field]).getTime() - new Date(a[field]).getTime()
          : new Date(a[field]).getTime() - new Date(b[field]).getTime();
      };
    },
  },
};
</script>

<style>
.checkboxes {
  width: 100%;
  margin: 0.25em auto;
}

#columnOptions {
  margin-bottom: 2em;
  margin-top: -1em;
}

nav {
  padding-right: 3em;
}

#toggleArea {
  display: grid;
  grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;
}

.checkboxDiv {
  display: block;
}

.columnOptions {
  padding: 0 3em;
}

.download {
  margin-left: 3em;
}

.tableInfo {
  display: flex;
  align-items: center;
  padding: 1em;
}

.totalChecked {
  margin-left: 3em;
}
</style>
