<template>
  <!-- Menu Start -->
  <div class="px-8 hidden lg:block">
    <nav>
      <ul class="flex">
        <li
          class="relative mr-14 group z-10 before:bg-nav-shape before:content-[''] before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100"
        >
          <NuxtLink
            to="/"
            class="text-white uppercase font-bold font-exo relative"
            >Home</NuxtLink
          >
        </li>

        <li
          class="relative mr-14 group z-10 before:bg-nav-shape before:content-[''] before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100"
        >
          <NuxtLink
            to="/game"
            class="text-white uppercase font-bold font-exo relative"
            >Games</NuxtLink
          >
        </li>

        <li
          class="relative mr-14 z-10 before:bg-nav-shape before:content-[''] before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100"
        >
          <NuxtLink
            to="/contact"
            class="text-white uppercase font-bold font-exo relative"
            >Contact</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </div>
  <!-- Menu End -->
</template>
