<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TASKS — Task Manager</title>
  <link rel="stylesheet" href="style.css" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
<body>

  <!-- Notification -->
  <div id="notification" class="notification" role="alert" aria-live="polite"></div>

  <!-- Header -->
  <header class="site-header">
    <div class="header-left">
      <span class="logo-mark">✦</span>
      <h1 class="site-title">TASKS</h1>
    </div>
    <div class="header-right">
      <span id="task-counter" class="task-counter">0 tasks</span>
      <button id="dark-mode-toggle" class="icon-btn" aria-label="Toggle dark mode" title="Toggle dark mode">
        <span id="theme-icon">◐</span>
      </button>
      <button id="export-btn" class="icon-btn" aria-label="Export tasks as JSON" title="Export JSON">
        <span>↓</span>
      </button>
    </div>
  </header>

  <!-- Stats Bar -->
  <div class="stats-bar">
    <div class="stat">
      <span class="stat-num" id="stat-total">0</span>
      <span class="stat-label">Total</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat">
      <span class="stat-num" id="stat-pending">0</span>
      <span class="stat-label">Pending</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat">
      <span class="stat-num" id="stat-done">0</span>
      <span class="stat-label">Done</span>
    </div>
    <div class="progress-wrap">
      <div class="progress-bar"><div id="progress-fill" class="progress-fill"></div></div>
    </div>
  </div>

  <!-- Main Layout -->
  <main class="main-layout">

    <!-- Sidebar -->
    <aside class="sidebar">

      <!-- Add Task Form -->
      <section class="panel" id="add-panel">
        <h2 class="panel-title">New Task</h2>
        <form id="task-form" novalidate>

          <div class="field-group">
            <label class="field-label" for="task-input">Title</label>
            <input
              type="text"
              id="task-input"
              class="field-input"
              placeholder="What needs doing?"
              autocomplete="off"
              maxlength="120"
            />
          </div>

          <div class="field-group">
            <label class="field-label" for="category-select">Category</label>
            <div class="select-wrap">
              <select id="category-select" class="field-input">
                <option value="">Loading…</option>
              </select>
            </div>
            <span id="api-status" class="api-status"></span>
          </div>

          <div class="field-group">
            <label class="field-label" for="priority-select">Priority</label>
            <div class="select-wrap">
              <select id="priority-select" class="field-input">
                <option value="low">Low</option>
                <option value="medium" selected>Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label" for="timer-input">Timer (seconds)</label>
            <input
              type="number"
              id="timer-input"
              class="field-input"
              placeholder="e.g. 300"
              min="1"
              max="86400"
            />
          </div>

          <button type="submit" class="btn-primary" id="add-btn">
            <span>Add Task</span>
            <span class="btn-icon">+</span>
          </button>

        </form>
      </section>

      <!-- Filters -->
      <section class="panel" id="filter-panel">
        <h2 class="panel-title">Filter</h2>

        <div class="field-group">
          <label class="field-label" for="search-input">Search</label>
          <input
            type="text"
            id="search-input"
            class="field-input"
            placeholder="Search tasks…"
            autocomplete="off"
          />
        </div>

        <div class="field-group">
          <label class="field-label">Category</label>
          <div id="category-filters" class="filter-pills">
            <button class="pill active" data-filter-cat="">All</button>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">Status</label>
          <div class="filter-pills">
            <button class="pill active" data-filter-status="all">All</button>
            <button class="pill" data-filter-status="pending">Pending</button>
            <button class="pill" data-filter-status="done">Done</button>
          </div>
        </div>
      </section>

    </aside>

    <!-- Task List -->
    <section class="task-section">
      <div id="loading-indicator" class="loading-indicator hidden">
        <div class="spinner"></div>
        <span>Fetching categories…</span>
      </div>

      <ul id="task-list" class="task-list" role="list" aria-label="Tasks">
        <!-- Tasks rendered here -->
      </ul>

      <div id="empty-state" class="empty-state">
        <span class="empty-icon">◎</span>
        <p>No tasks yet.<br/>Add one to get started.</p>
      </div>
    </section>

  </main>

  <script src="script.js"></script>
</body>
</html>
