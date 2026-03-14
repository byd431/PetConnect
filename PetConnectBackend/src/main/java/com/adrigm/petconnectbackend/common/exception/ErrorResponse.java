package com.adrigm.petconnectbackend.common.exception;

public record ErrorResponse(
        int status,
        String message,
        long timestamp
) {}