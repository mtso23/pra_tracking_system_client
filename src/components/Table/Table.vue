<template>
  <div>
    <b-collapse class="columnOptions" :open="false">
      <button class="button is-primary" slot="trigger">Show/Hide Column Option</button>
      <div class="toggleArea">
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Initial information:</h4>
          <div class="checkboxDiv">
            <div
              v-for="(state, name) in VIEWABLE_COLUMNS['INITIAL_INFO']"
              :key="name"
              class="control"
            >
              <b-checkbox v-model="VIEWABLE_COLUMNS['INITIAL_INFO'][name]">
                {{
                COLUMNS_TO_LABELS[name]
                }}
              </b-checkbox>
            </div>
          </div>
        </div>
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Dates:</h4>
          <div class="checkboxDiv">
            <div v-for="(state, name) in VIEWABLE_COLUMNS['DATES']" :key="name" class="control">
              <b-checkbox v-model="VIEWABLE_COLUMNS['DATES'][name]">
                {{
                COLUMNS_TO_LABELS[name]
                }}
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
                {{
                COLUMNS_TO_LABELS[name]
                }}
              </b-checkbox>
            </div>
          </div>
        </div>
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Analysis:</h4>
          <div class="checkboxDiv">
            <div v-for="(state, name) in VIEWABLE_COLUMNS['ANALYSIS']" :key="name" class="control">
              <b-checkbox v-model="VIEWABLE_COLUMNS['ANALYSIS'][name]">
                {{
                COLUMNS_TO_LABELS[name]
                }}
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
        class="TableHeader--Button"
        :data="prepareDataForExporting(data)"
        :fields="FIELDS_TO_EXPORT"
        :name="'data_all_' + new Date().toLocaleDateString()"
      >
        <b-button type="is-primary" rounded>Download all as CSV</b-button>
      </download-csv>
      <download-csv
        class="TableHeader--Button"
        :data="prepareDataForExporting(data)"
        :fields="filterFieldsToExport(FIELDS_TO_EXPORT, VIEWABLE_COLUMNS)"
        :name="'data_filtered_' + new Date().toLocaleDateString()"
      >
        <b-button type="is-link" rounded outlined>Download only visible columns as CSV</b-button>
      </download-csv>
      <b-button
        class="TableHeader--Button"
        type="is-danger"
        rounded
        :disabled="checkedRows.length === 0"
        v-on:click="confirmDeletePRAs"
      >Delete {{ checkedRows.length }} checked entries</b-button>
    </section>
    <b-table
      class="table"
      :data="data"
      hoverable
      paginated
      :current-page.sync="currentPage"
      paginationPosition="bottom"
      per-page="25"
      default-sort-direction="asc"
      default-sort="lea"
      checkable
      checkbox-position="left"
      :checked-rows.sync="checkedRows"
    >
      <template slot-scope="props">
        <b-table-column centered custom-key="View" field="id" label="View" visible>
          <b-button
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
          >View</b-button>
        </b-table-column>
        <b-table-column
          field="lastupdated"
          label="Last updated"
          centered
          sortable
          :visible="VIEWABLE_COLUMNS['CURRENT_INFO']['lastupdated']"
          :custom-sort="dateSort('lastupdated')"
        >
          <span class="tag is-medium">
            {{ props.row.lastupdated ? new Date(props.row.lastupdated).toLocaleDateString()
            : "" }}
            </span>
        </b-table-column>
        <b-table-column
          field="county"
          label="County"
          centered
          searchable
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
          label="Link to request"
          centered
          :visible="VIEWABLE_COLUMNS['CURRENT_INFO']['linktoprarequest']"
        >
          <a :href="'//' + props.row.linktoprarequest" target="_blank">
            <img alt="link" src="../../assets/link_icon.svg" width="24" />
          </a>
        </b-table-column>
        <!-- For now dont show contact info in the table
        <b-table-column
          field="contactinfo"
          label="Contact info"
          centered
          :visible="VIEWABLE_COLUMNS['CURRENT_INFO']['contactinfo']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.currentcontact.info }}</span>
        </b-table-column>-->
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
          centered
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['issheriffsdept']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.issheriffsdept ? "SD" : "PD" }}</span>
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

import {
  COLUMNS_TO_LABELS,
  VIEWABLE_COLUMNS,
  FIELDS_TO_EXPORT
} from "../../definitions.js";
import {
  filterFieldsToExport,
  objectValuesToString,
  prepareDataForExporting
} from "./csvExport.js";

export default {
  name: "Table",
  data() {
    return {
      // We don't currently use checkedRows for anything, but could possibly in the future allow for
      //  export of only checked rows. The b-table binds the checkedRows to this property
      checkedRows: [],
      // Tracks the current page. The b-table binds to this value
      currentPage: 1,
      // Array that holds all database data to display in the b-table
      data: [],

      // Make imported veriables/functions available for use throughout component
      COLUMNS_TO_LABELS,
      FIELDS_TO_EXPORT,
      VIEWABLE_COLUMNS,

      filterFieldsToExport,
      objectValuesToString,
      prepareDataForExporting
    };
  },
  // When the component mounts, fetch data from backend and store in 'data' attribute
  mounted() {
    axios
      .get("https://pra-tracking-dev.herokuapp.com/api/pra?fields=all")
      .then(response => {
        this.data = response.data;
      });
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
    deletePRA: async function(praID) {
      // Delete from db
      await axios.delete(
        `https://pra-tracking-dev.herokuapp.com/api/pra/${praID}`
      );
      // Delete from local data
      const deletedItemIdx = this.data.findIndex(pra => pra.id === praID);
      this.data.splice(deletedItemIdx, 1);
    },
    deletePRAs: async function(PRAs) {
      try {
        for (const PRA of PRAs) {
          await this.deletePRA(PRA.id);
        }
        // Remove from checked rows
        this.checkedRows = [];
        this.alertDeleteSuccess();
      } catch (err) {
        this.alertDeleteFailure();
      }
    },
    confirmDeletePRAs: function() {
      this.$buefy.dialog.confirm({
        title: "Deleting PRAs",
        message:
          "Are you sure you want to <b>delete</b> these entries? This action cannot be undone.",
        confirmText: "Delete",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.deletePRAs(this.checkedRows)
      });
    },
    alertDeleteFailure() {
      this.$buefy.dialog.alert("Error deleting PRA requests");
    },
    alertDeleteSuccess() {
      this.$buefy.toast.open({
        message: "Successfully deleted",
        type: "is-danger",
        duration: 5000,
        position: "is-bottom"
      });
    }
  }
};
</script>

<style>
.checkboxes {
  width: 100%;
  margin: 0.25em auto;
}

.columnOptions {
  margin-bottom: 1rem;
  text-align: center;
}

.toggleArea {
  display: grid;
  grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;
  margin-top: 2rem;
}

.checkboxDiv {
  display: block;
}

.columnOptions {
  padding: 0 3em;
}

.TableHeader--Button {
  margin-left: 3em;
}

.table {
  max-width: 100vw;
  overflow-x: scroll;
}

.table div.control {
  width: 100%;
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
