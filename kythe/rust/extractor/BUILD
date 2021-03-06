load("@bazel_skylib//:bzl_library.bzl", "bzl_library")
load("@rules_rust//rust:rust.bzl", "rust_binary", "rust_clippy", "rust_library")
load("@rules_rust//proto:toolchain.bzl", "PROTO_COMPILE_DEPS")
load(":extractor_test.bzl", "rust_extractor_test")

package(default_visibility = ["//visibility:public"])

rust_library(
    name = "kythe_rust_extractor",
    srcs = glob(
        include = ["src/**/*.rs"],
        exclude = ["src/bin/**"],
    ),
    edition = "2018",
)

rust_binary(
    name = "extractor",
    srcs = glob(["src/bin/**/*.rs"]),
    edition = "2018",
    deps = [
        ":kythe_rust_extractor",
        "//third_party/bazel:extra_actions_base_rust_proto",
        "//kythe/proto:analysis_rust_proto",
        "//kythe/rust/cargo:zip",
        "//kythe/rust/cargo:rls_data",
        "//kythe/rust/cargo:clap",
        "//kythe/rust/cargo:anyhow",
        "//kythe/rust/cargo:tempdir",
        "//kythe/rust/cargo:hex",
        "//kythe/rust/cargo:sha2",
    ] + PROTO_COMPILE_DEPS,
)

rust_clippy(
    name = "clippy",
    deps = [
        ":extractor",
        ":extractor_integration_test_binary",
        ":kythe_rust_extractor",
    ],
)

rust_binary(
    name = "extractor_test_binary",
    srcs = ["tests/test.rs"],
    edition = "2018",
    rustc_flags = [
        "--test",
    ],
    deps = [
        ":kythe_rust_extractor",
        "//kythe/rust/cargo:tempdir",
    ],
)

rust_extractor_test(
    name = "extractor_test",
    src = ":extractor_test_binary",
)

rust_binary(
    name = "extractor_integration_test_binary",
    srcs = ["tests/integration_test.rs"],
    edition = "2018",
    deps = [
        "//kythe/proto:analysis_rust_proto",
        "//kythe/rust/cargo:anyhow",
        "//kythe/rust/cargo:tempdir",
        "//kythe/rust/cargo:zip",
        "//third_party/bazel:extra_actions_base_rust_proto",
        "@rules_rust//proto/raze:protobuf",
    ],
)

rust_extractor_test(
    name = "extractor_integration_test",
    src = ":extractor_integration_test_binary",
)

bzl_library(
    name = "extractor_test_bzl",
    srcs = ["extractor_test.bzl"],
)
