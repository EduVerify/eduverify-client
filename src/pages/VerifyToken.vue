<script setup lang="ts">
import { router } from '@/plugins/1.router';

onMounted(() => {
  const queryParams = new URLSearchParams(window.location.search);
  console.log(queryParams);
  
      const token = queryParams.get('token');
console.log(token);

      if (token) {
        const accessToken = useCookie('accessToken');
        accessToken.value = token; // Save the token in a cookie
        localStorage.setItem('accessToken', token); // Save the token in local storage
        // Redirect to a protected page
        router.push({ name: 'root' });
      }
})
</script>
