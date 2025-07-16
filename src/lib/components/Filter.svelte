<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  type FilterType = {
    value: string;
    label: string;
  };
  type Parameter = {
    id: string;
    label: string;
  };
  type Filters = {
    type: string;
    substance: string;
    header: string;
    heightFrom: string;
    heightTo: string;
    micronFrom: string;
    micronTo: string;
    parameters: string[];
  };

  const dispatch = createEventDispatcher<{ filterChange: Filters }>();

  let filters: Filters = {
    type: '',
    substance: '',
    header: '',
    heightFrom: '',
    heightTo: '',
    micronFrom: '',
    micronTo: '',
    parameters: []
  };

  const filterTypes: FilterType[] = [
    { value: '1', label: 'Наименование 1' },
    { value: '2', label: 'Наименование 2' },
    { value: '3', label: 'Наименование 3' }
  ];

  const substances: FilterType[] = [
    { value: '1', label: 'Наименование 1' },
    { value: '2', label: 'Наименование 2' },
    { value: '3', label: 'Наименование 3' }
  ];

  const headers: FilterType[] = [
    { value: '1', label: 'Наименование 1' },
    { value: '2', label: 'Наименование 2' },
    { value: '3', label: 'Наименование 3' }
  ];

  const parameters: Parameter[] = [
    { id: 'parameter-1', label: 'Параметр 1' },
    { id: 'parameter-2', label: 'Параметр 2' },
    { id: 'parameter-3', label: 'Параметр 3' }
  ];

  function updateFilters() {
    dispatch('filterChange', filters);
  }

  function handleTypeChange(event: Event) {
    filters.type = (event.target as HTMLSelectElement).value;
    updateFilters();
  }

  function handleSubstanceChange(event: Event) {
    filters.substance = (event.target as HTMLSelectElement).value;
    updateFilters();
  }

  function handleHeaderChange(event: Event) {
    filters.header = (event.target as HTMLSelectElement).value;
    updateFilters();
  }

  function handleHeightFromChange(event: Event) {
    filters.heightFrom = (event.target as HTMLInputElement).value;
    updateFilters();
  }

  function handleHeightToChange(event: Event) {
    filters.heightTo = (event.target as HTMLInputElement).value;
    updateFilters();
  }

  function handleMicronFromChange(event: Event) {
    filters.micronFrom = (event.target as HTMLInputElement).value;
    updateFilters();
  }

  function handleMicronToChange(event: Event) {
    filters.micronTo = (event.target as HTMLInputElement).value;
    updateFilters();
  }

  function handleParameterChange(parameterId: string, e: Event) {
    const target = e.target as HTMLInputElement | null;
    if (target && typeof target.checked === 'boolean') {
      const checked = target.checked;
      if (checked) {
        filters.parameters = [...filters.parameters, parameterId];
      } else {
        filters.parameters = filters.parameters.filter(id => id !== parameterId);
      }
      updateFilters();
    }
  }

  function clearFilters() {
    filters = {
      type: '',
      substance: '',
      header: '',
      heightFrom: '',
      heightTo: '',
      micronFrom: '',
      micronTo: '',
      parameters: []
    };
    updateFilters();
  }
</script>

<aside class="bg-white rounded-lg shadow-md p-6">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold text-gray-900">Поиск по параметрам</h3>
    <button
      on:click={clearFilters}
      class="text-sm text-primary-600 hover:text-primary-700 transition-colors"
    >
      Очистить
    </button>
  </div>

  <div class="space-y-6">
    <!-- Тип фильтра -->
    <div>
      <label for="filter-type" class="block text-sm font-medium text-gray-700 mb-2">
        Тип фильтра:
      </label>
      <select
        id="filter-type"
        bind:value={filters.type}
        on:change={handleTypeChange}
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
      >
        <option value="">Выберите тип</option>
        {#each filterTypes as type}
          <option value={type.value}>{type.label}</option>
        {/each}
      </select>
    </div>

    <!-- Субстанция -->
    <div>
      <label for="filter-substance" class="block text-sm font-medium text-gray-700 mb-2">
        Субстанция:
      </label>
      <select
        id="filter-substance"
        bind:value={filters.substance}
        on:change={handleSubstanceChange}
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
      >
        <option value="">Выберите субстанцию</option>
        {#each substances as substance}
          <option value={substance.value}>{substance.label}</option>
        {/each}
      </select>
    </div>

    <!-- Заголовок -->
    <div>
      <label for="filter-header" class="block text-sm font-medium text-gray-700 mb-2">
        Заголовок:
      </label>
      <select
        id="filter-header"
        bind:value={filters.header}
        on:change={handleHeaderChange}
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
      >
        <option value="">Выберите заголовок</option>
        {#each headers as header}
          <option value={header.value}>{header.label}</option>
        {/each}
      </select>
    </div>

    <!-- Высота -->
    <div>
      <label for="height-from" class="block text-sm font-medium text-gray-700 mb-2">
        Высота:
      </label>
      <div class="flex space-x-2">
        <input
          id="height-from"
          type="number"
          bind:value={filters.heightFrom}
          on:input={handleHeightFromChange}
          placeholder="от"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent flex-1"
        />
        <span class="flex items-center text-gray-500">—</span>
        <input
          id="height-to"
          type="number"
          bind:value={filters.heightTo}
          on:input={handleHeightToChange}
          placeholder="до"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent flex-1"
        />
      </div>
    </div>

    <!-- Микронаж -->
    <div>
      <label for="micron-from" class="block text-sm font-medium text-gray-700 mb-2">
        Микронаж:
      </label>
      <div class="flex space-x-2">
        <input
          id="micron-from"
          type="number"
          bind:value={filters.micronFrom}
          on:input={handleMicronFromChange}
          placeholder="от"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent flex-1"
        />
        <span class="flex items-center text-gray-500">—</span>
        <input
          id="micron-to"
          type="number"
          bind:value={filters.micronTo}
          on:input={handleMicronToChange}
          placeholder="до"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent flex-1"
        />
      </div>
    </div>

    <!-- Чекбоксы -->
    <div>
      <fieldset>
        <legend class="block text-sm font-medium text-gray-700 mb-2">
          Дополнительные параметры:
        </legend>
        <div class="space-y-2">
          {#each parameters as parameter}
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                id={parameter.id}
                checked={filters.parameters.includes(parameter.id)}
                on:change={(e) => handleParameterChange(parameter.id, e)}
                class="w-5 h-5 text-sky-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span class="text-sm text-gray-700">{parameter.label}</span>
            </label>
          {/each}
        </div>
      </fieldset>
    </div>
  </div>
</aside> 