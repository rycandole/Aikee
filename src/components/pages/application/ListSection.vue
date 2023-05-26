<script setup>

</script>
<template>
    <div class="col-12">
        <div class="row mt-3 justify-content-center">
            <div class="tableDiv col-12 bg-white border ">
                
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="border-top-0">Name</th>
                            <th class="border-top-0">Country</th>
                            <th class="border-top-0">Email</th>
                            <th class="border-top-0">Date</th>
                            <th class="border-top-0">Status</th>
                            <th class="border-top-0">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sample Example</td>
                            <td>U.S.A.</td>
                            <td>sample@example.com</td>
                            <td>May 05, 2023</td>
                            <td>Paid</td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                      Dropdown button
                                    </button>
                                    <ul class="dropdown-menu">
                                      <li><a class="dropdown-item" href="#">Action</a></li>
                                      <li><a class="dropdown-item" href="#">Another action</a></li>
                                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                  </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Sample Example</td>
                            <td>U.S.A.</td>
                            <td>sample@example.com</td>
                            <td>May 05, 2023</td>
                            <td>Paid</td>
                            <td>Edit</td>
                        </tr>
                        <tr>
                            <td>Sample Example</td>
                            <td>U.S.A.</td>
                            <td>sample@example.com</td>
                            <td>May 05, 2023</td>
                            <td>Paid</td>
                            <td>Edit</td>
                        </tr>
                        <tr>
                            <td class="p-5" colspan="6"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.tableDiv {
    height: auto;
    min-height: 40rem;
    margin: 0;
    padding: 0;
}
</style>