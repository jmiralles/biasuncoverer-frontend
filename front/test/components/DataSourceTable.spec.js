import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import DataSourceTable from '../../src/components/DataSourceTable'
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('DataSourceTable.vue', () => {
    let actions
    let state = {
        files: []
    }
    let mutations
    let store
  
    beforeEach(() => {
      mutations = {
        SET_NEW_ANALYSIS_FILE: jest.fn()
      }
      actions = {
        GET_FILES: jest.fn()
      }
      store = new Vuex.Store({
        state,
        mutations,
        actions
      })
    })
  
    it('dispatches "GET_FILES" when component is Mounted', () => {
      shallowMount(DataSourceTable, { store, localVue })
      expect(actions.GET_FILES).toHaveBeenCalled()
    })

    it('table does not renders if there are no files in store', () => {
        const wrapper = mount(DataSourceTable, { store, localVue })
        const table = wrapper.find('table')
        const div = wrapper.find('div#message')

        expect(table.exists()).toBe(false)
        expect(div.text()).toBe('Please, upload a file first')
    })

    it('table renders same number of rows as files in store', () => {
        store.state.files = [{file_id: 1}, {file_id: 2}, {file_id: 3}]
        const wrapper = mount(DataSourceTable, { store, localVue })
        const table = wrapper.find('table')
        const tBody = table.find('tBody')
        const rows = tBody.findAll('tr')

        expect(table.is('table')).toBe(true)
        expect(rows.length).toBe(3)
    })

    it('rowSelected is fired with correct file_id with when clicked on a row', () => {
        store.state.files = [{file_id: 1}, {file_id: 2}, {file_id: 3}]
        const rowSelected = jest.fn()
        const wrapper = mount(DataSourceTable, { store, localVue, methods: {rowSelected} })
        const table = wrapper.find('table')
        const tBody = table.find('tBody')

        const row = tBody.find('tr')
        row.trigger('click')
        expect(rowSelected).toHaveBeenCalledWith([{"file_id": 1}])
    })
  })