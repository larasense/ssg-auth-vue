# Authentication for larasense/static-site-generation application using Vue3 and Pinia

[static-site-generation](https://github.com/larasense/static-site-generation) is a Laravel Package for generate static sites using a command or a middleware on visit.

It is meant to be used on a Breeze or Jetstream with the InertiaJs stack, and provide a simple and quick way to generate and consume static content.

But it come with a cabeat. the site generated with no credentials and for that reason authentication need to be handeled difffernly on the Front side.

## Instalation

```bash
npm i @larasense/ssg-auth-vue
```

## Configuration

TBD

## How to use

### Backend

on `app/Http/Middleware/HandleInertiaRequests.php` or wherever the share props is set, call the getUserInfo() from the StaticSite Facade to replace the auth prop.

```php
// app/Http/Middleware/HandleInertiaRequests.php
    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            // ....
            'auth' => StaticSite::getUserInfo(),
        ]);
    }

```

### Frontend

On every page or component that need to access the user

```vue
<script setup>
import { useAuth } from "@larasense/ssg-auth-vue";
const props = defineProps({
  // ...
  auth: Object,
});
const auth = useAuth();
auth.setPropUser(props.auth.user);
</script>
```

and then replace `$page.props.auth.user` for `auth.user`

```html
<Link v-if="auth.user" :href="route('dashboard')"
    class="">
Dashboard</Link>

<template v-else>
    <Link :href="route('login')"
        class="">
    Log in</Link>
    <Link v-if="canRegister" :href="route('register')"
        class="">
    Register</Link>
</template>
```
